## Review Guidelines

1. Pull requests must be reviewed by at least two people, except for small bug fixes or changes in comments/Readmes which need to be reviewed by at least one person only.
2. The code must be run by at least one of the reviewers on their local machine and the newly implemented features should work
3. A pull request must be approved by at least two people (or one person for smaller PRs). Once a PR received two approvals, either the PR creator or any of the reviewers may accept the PR and merge into the destination branch.
4. A review must contain at least one comment, either feedback or a "LGTM" ("Looks Good To Me").
5. Try to keep the total number of comments in a review as low as possible but as high as necessary. In particular, if you have to comment on similar aspects multiple times, such as non descriptive variable names, or missing comments/copyright headers, summarize/list these comments in one comment. It is much nicer and a lot less frustrating to check five comments on your pull request, then it is to check 25+ comments that are very repetitive.
6. Reason why something should be changed.
7. The following code quality criteria must be fulfilled (can be used as a checklist):
    - The code is easy to understand for someone who is unfamiliar with the code base.
    - The code is easy to maintain, i.e. does not use overly complicated data structures or can easily be adjusted to extend use cases.
    - Code that can be reused for other use cases, should be put in their own function. In particular, multiple places in the code base should not have 100% replicated code, but rather use a function instead of replicating the code multiple times.
    - The code may not contain any obvious security bugs that allow exploitation from the outside.
    - Code should not be over engineered or contain code that "might" be needed in the future. A simple implementation of a feature often is better than a complex, overly complicated implementation that maybe has no additional usage in the feature.
    - Obvious running time inefficiencies should be avoided, e.g. too many nested loops or sleep statements that were used during debugging.
    - The code base should not contain dead code. If code examples should be left for further usage or other developers, then they should be included in comments/JDocs.
    - Functions should not be overly long and should be separated into logical units, if possible. In particular, functions do not need to be split apart just for the sake of it but only to improve understandability, maintainability and reusability.
    - Variable names should be pronounceable. Best case for variables is if people understand their meaning by pronouncing them. Common idiomatic variable names such as i, j, k, l, iter, tmp or temp may be used.
    - Variable name shadowing should be avoided, if possible.
    - Large components/functions should be commented/contain JDocs (or simiar). Small functions/components should be self descriptive or also contain a comment/JDocs. Non trivial implementations (e.g. algorithms) should contain comments.
    - There must be a copyright header in each edited code file. In particular, if there already was a copyright header, the new author's information should be added in the header.
    - If realistically possible, there should be tests for newly commited code. Some functions/components might require multiple services to be running (e.g. appwrite deployed with various custom functions). As long as there is no automated CI pipeline for running these tests efficiently, no tests are required. However, testability of functions/components should be kept in mind.
