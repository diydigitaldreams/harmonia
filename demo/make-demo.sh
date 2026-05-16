#!/usr/bin/env bash
set -euo pipefail

# Harmonia demo video builder
#
# Usage without voice-over:
#   bash demo/make-demo.sh path/to/raw-demo.webm
#
# Usage with voice-over:
#   bash demo/make-demo.sh path/to/raw-demo.webm path/to/voiceover.wav
#
# Optional:
#   CUT_LIST=demo/cut-list.csv OUTPUT=harmonia-demo-final.mp4 bash demo/make-demo.sh raw.webm
#
# Requirements:
#   ffmpeg
#
# The cut list must be CSV with this format:
#   clip,start,end,label
#   1,00:00:00,00:00:30,opening
#
# Times use HH:MM:SS or HH:MM:SS.mmm.

RAW_VIDEO="${1:-}"
VOICEOVER="${2:-}"
CUT_LIST="${CUT_LIST:-demo/cut-list.csv}"
OUTPUT="${OUTPUT:-harmonia-demo-final.mp4}"
WORKDIR="${WORKDIR:-demo/build}"
CLIP_LIST="$WORKDIR/clips.txt"
SILENT_CUT="$WORKDIR/silent-cut.mp4"

if [[ -z "$RAW_VIDEO" ]]; then
  echo "Usage: bash demo/make-demo.sh path/to/raw-demo.webm [path/to/voiceover.wav]"
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg is not installed."
  echo "Install it with: sudo apt install ffmpeg"
  exit 1
fi

if [[ ! -f "$RAW_VIDEO" ]]; then
  echo "Error: raw video not found: $RAW_VIDEO"
  exit 1
fi

if [[ -n "$VOICEOVER" && ! -f "$VOICEOVER" ]]; then
  echo "Error: voice-over file not found: $VOICEOVER"
  exit 1
fi

if [[ ! -f "$CUT_LIST" ]]; then
  echo "Error: cut list not found: $CUT_LIST"
  exit 1
fi

rm -rf "$WORKDIR"
mkdir -p "$WORKDIR"
: > "$CLIP_LIST"

# Read CSV, skipping the header.
tail -n +2 "$CUT_LIST" | while IFS=, read -r clip start end label; do
  # Skip blank lines.
  [[ -z "${clip// }" ]] && continue

  safe_label="$(echo "$label" | tr -cd '[:alnum:]_-')"
  clip_file="$WORKDIR/clip-${clip}-${safe_label}.mp4"

  echo "Cutting clip $clip: $start -> $end ($label)"

  ffmpeg -y \
    -ss "$start" \
    -to "$end" \
    -i "$RAW_VIDEO" \
    -an \
    -vf "scale=1920:-2,fps=30,format=yuv420p" \
    -c:v libx264 \
    -preset veryfast \
    -crf 23 \
    "$clip_file"

  printf "file '%s'\n" "$(basename "$clip_file")" >> "$CLIP_LIST"
done

if [[ ! -s "$CLIP_LIST" ]]; then
  echo "Error: no clips were created. Check $CUT_LIST."
  exit 1
fi

pushd "$WORKDIR" >/dev/null
ffmpeg -y -f concat -safe 0 -i "$(basename "$CLIP_LIST")" -c copy "$(basename "$SILENT_CUT")"
popd >/dev/null

if [[ -z "$VOICEOVER" ]]; then
  cp "$SILENT_CUT" "$OUTPUT"
  echo "Done: $OUTPUT"
  echo "Note: exported silent rough cut. Add voice-over later by rerunning with a voice-over file."
  exit 0
fi

ffmpeg -y \
  -i "$SILENT_CUT" \
  -i "$VOICEOVER" \
  -c:v copy \
  -c:a aac \
  -b:a 192k \
  -shortest \
  "$OUTPUT"

echo "Done: $OUTPUT"
