The current project files are already clean: there are no `.mp4`, `.mov`, `.webm`, `.m4v`, `.avi`, or `.mkv` files left in the working tree, and the site now references external video URLs only.

The GitHub sync error is coming from large video blobs that still exist in Git history, specifically:

- `public/media/wen-pizza-nyc.mp4`
- `public/media/wen-pizza-nyc.mov`
- plus older removed videos such as `community-prayagraj.mp4`, `community-yerevan.mp4`, `nyc-rp-teaser.mp4`, and `moment-reel.mp4`

Plan:

1. Rewrite repository history to permanently remove video blobs
   - Run a history-cleaning command against the local Git history.
   - Strip all common video extensions from every commit, not just the current project files.
   - Target: `*.mp4`, `*.mov`, `*.webm`, `*.m4v`, `*.avi`, `*.mkv`.

2. Verify the cleanup
   - Confirm there are still no video files in the current project tree.
   - Confirm `git rev-list --objects --all` no longer shows the blocked files.
   - Confirm source code only references external hosted video links and small local poster images.

3. Keep the prevention rules in place
   - Leave `.gitignore` blocking future video commits.
   - Keep the existing plan note explaining that videos must be hosted externally.

Technical note:

This is not a normal file delete. The files are already deleted from the current app, but GitHub rejects the sync because those large files still exist in prior commits. The fix is Git history cleanup, not another UI/code edit.