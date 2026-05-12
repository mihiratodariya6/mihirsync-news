# Security Specification: MihirSync

## Data Invariants
1. An article must have a unique slug and valid content.
2. Only authorized admins can create or edit articles.
3. Users can only edit their own profiles and bookmarks.
4. Comments must be linked to a valid user and satisfy length constraints.
5. `createdAt` and `publishedAt` must be set using server timestamps.

## The Dirty Dozen (Threat Payloads)
1. **Identity Spoofing**: Attempt to create an article with someone else's `authorId`.
2. **Privilege Escalation**: Attempt to update a user profile to set `isAdmin: true`.
3. **Ghost Field Injection**: Attempt to add `isVerified: true` to an article via update.
4. **ID Poisoning**: Attempt to use `../poison/..` as a document ID.
5. **Timestamp Fraud**: Attempt to set a past date for `publishedAt`.
6. **Orphaned Write**: Create a comment for a non-existent article.
7. **Size Exhaustion**: Send a 1MB string as a tag.
8. **Unauthorized Deletion**: A regular user trying to delete an article.
9. **Spam Attack**: Attempt to post 100 comments in 1 second (Rate limiting - though rules are limited, we check auth).
10. **State Bypassing**: Trying to update `views` to a random high number (should only increment or be restricted).
11. **PII Leak**: Attempting to read another user's profile containing their private bookmarks.
12. **Malicious Link**: Attempting to inject a script into the article `content`.

## Firestore Rules Draft
(See `firestore.rules`)
