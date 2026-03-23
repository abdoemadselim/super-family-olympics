# Review Action

1. Read current-feature.md to understand the goals
2. Review all code changes made for this feature
3. Check for:
   - ✅ Goals met
   - ❌ Goals missing or incomplete
   - ⚠️ Code quality issues or bugs
   - 🚫 Scope creep (code beyond goals)
If it's UI implementation, use playwright mcp to check if implementation match the design file.

For UI:

## Important: Actually render the layout mentally

Do NOT just check that components exist. For every layout-related element, mentally trace what the code **actually renders visually**:
- Consider `dir="rtl"` effects on flex order, text alignment, and border sides
- Trace the DOM order + CSS (flex-direction, grid columns) to determine which side each element appears on
- Verify logical properties (`border-s`, `start-*`, `end-*`) are used correctly for RTL instead of physical (`border-l`, `left-*`, `right-*`)
- Compare the **resulting visual layout** against the Figma screenshot, not just whether the component is present
- For RTL layouts: remember that `dir="rtl"` reverses flex/grid order — the **first** DOM child appears on the **right**, not the left. Always verify sidebar/main content placement by checking DOM order combined with RTL direction, not by assuming left-to-right rendering
      - Review the placement of each section/element. Should be displayed in the same location as the design

Examples of other things to **report**:
### Layout & Structure
- Correct grid/columns
- Proper alignment (left/right/center)
- Spacing (padding/margin) matches design
- Section hierarchy matches Figma
- Elements/Sections are placed in the same locations as the design
### Components
- All components in Figma exist in UI
- No extra/unexpected components
- Correct component variants used
### Typography
- Font size, weight, line height
- Text hierarchy (headings vs body)
- Truncation / ellipsis behavior
### Colors & Styling
- Background colors
- Text colors
- Borders, shadows, opacity
- Correct use of theme tokens

## Important: Ignore data differences

Only report differences in **how things look**, not **what data is shown**. The design reference may use placeholder/mock data that differs from the real database.

Examples of things to **ignore**:
- Different number of items, collections, or counts
- Different names, titles, or descriptions
- Different tags or labels on items
- Missing or extra list entries due to data
- Different dates or timestamps


4. Final verdict: Ready to complete or needs changes