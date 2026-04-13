import type { DynamicAstRule } from "./types.js";
import { createCommentPatternRule } from "./rule-helpers.js";

export const noNarratorComments: DynamicAstRule = {
  id: "no-narrator-comments",
  name: "No Narrator Comments",
  description:
    'AI writes "This function handles..." style comments that narrate instead of explain.',
  category: "ai-tell",
  severity: "info",
  languages: ["js", "ts", "jsx", "tsx", "mjs", "cjs", "py"],
  detect: createCommentPatternRule(
    [
      /this\s+(?:function|method|class|module|component|hook|helper|utility)\s+(?:is\s+(?:used\s+)?(?:to|for)|handles?|creates?|returns?|processes?|manages?|implements?|provides?|performs?|does)/i,
      /^(?:Calculate|Get|Add|Loop|Sort|Filter|Check|Map|Convert|Remove|Create|Initialize|Setup|Load|Fetch|Process|Handle|Update|Set|Render|Display|Show|Hide|Toggle|Enable|Disable|Start|Stop|Pause|Resume|Validate|Parse|Format|Transform|Navigate|Scroll|Resize|Open|Close|Submit|Reset|Clear|Save|Read|Write|Append|Prepend|Concat|Join|Split|Combine|Separate|Extract|Import|Export|Generate|Delete|Modify|Change|Adjust|Assign|Declare|Define|Empty|Populate|Fill|Pop|Push|Shift|Unshift|Slice|Splice|Cut|Copy|Clone|Duplicate|Reverse|Rotate|Flip|Mirror|Paste|Move|Drag|Drop|Reshape|Remodel|Restructure|Rearrange|Reorganize|Reorder|Query|Search|Find|Locate|Identify|Detect|Recognize|Classify|Categorize|Group|Organize|Arrange|Layout|Structure|Design|Theme|Skin|Edit|Patch|Fix|Resolve|Solve|Debug|Test|Verify|Confirm|Ensure|Guarantee|Assert|Prove|Demonstrate|Showcase|Illustrate|Explain|Describe|Document|Comment|Note|Remark|Annotate|Mark|Flag|Tag|Label|Name|Title|Caption|Header|Footer|Legend|Alt|Text|Description|Summary|Abstract|Overview|Introduction|Conclusion|Output|Return|Yield|Emit|Send|Receive|Take|Pull|Push|Post|Put|Merge|CherryPick|Clone|Init|Config|Install|Build|Run|Lint|Fixup|Revert|Undo|Redo|Rollback|Backup|Restore|Recover|Retrieve|Download|Upload|Transfer|Sync|Upgrade|Downgrade|Migrate|Port|Adapt)/i,
    ],
    [
      /eslint-disable/i,
      /@param/i,
      /@returns/i,
      /jsdoc/i,
      /noqa/i,
      /docstring/i,
    ],
    "Remove narrator comments that restate the code. Comment should explain WHY: the business rationale, edge cases, or constraints. Function names should make WHAT clear. Delete this AI-generated narration.",
  ),
};
