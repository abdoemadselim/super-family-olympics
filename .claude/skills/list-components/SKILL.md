---
name: list-components
description: List project components
argument-hint: subdirectory
---

## Task

List all React components inside components directory
(.js, .jsx, .ts, .tsx)

If a [subdirectory] is provided via $ARGUMENTS, only list files in that subdirectory

## Output Format
- Numbered list of files with relative paths. 
- Brief one-line description of each file (infer from filename)
- Summary count at the end
- If no files found, say "No components found"