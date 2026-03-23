# Test-UI Action

1. Check the given screenshot or image path in $ARGUMENTS after "test-ui" to see how the design should be
2. Check the UI implementation in current-feature.md or the screen name given in $ARGUMENTS if provided
3. Use Playwright MCP to check for differences between the given design and the implementation. Take a screenshot of the current implementation, and compare it to design
4. Report only **design/styling differences** — layout, spacing, colors, typography, component structure, visibility, interactions (e.g. hover states), and missing UI elements

## Important: Ignore data differences

Only report differences in **how things look**, not **what data is shown**. The design reference may use placeholder/mock data that differs from the real database.

Examples of things to **ignore**:
- Different number of items, collections, or counts
- Different names, titles, or descriptions
- Different tags or labels on items
- Missing or extra list entries due to data
- Different dates or timestamps

Examples of things to **report**:
- A UI element exists in the design but is missing in implementation (e.g. tag badges not rendered at all)
- Hover-only elements always visible (or vice versa)
- Wrong colors, borders, spacing, or typography
- Layout or grid differences (e.g. wrong number of columns)
- Missing icons, buttons, or interactive elements
- Different component structure or styling