-- This is an empty migration.

CREATE INDEX borrowed_books ON "UserBookBorrowing" (status,borrowed_at)
WHERE status = 'BORROWED';

