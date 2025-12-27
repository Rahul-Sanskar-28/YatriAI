/**
 * Database utility helpers for handling provider-specific features
 * 
 * Note: This application requires PostgreSQL as the database provider.
 * Some features like case-insensitive string matching (mode: 'insensitive')
 * are PostgreSQL-specific and will not work with MySQL or SQLite.
 */

/**
 * Creates a case-insensitive string filter for Prisma queries.
 * 
 * IMPORTANT: The 'insensitive' mode is only supported by PostgreSQL.
 * If you're using MySQL or SQLite, this will throw a runtime error.
 * 
 * @param value - The string value to search for
 * @returns Prisma StringFilter with case-insensitive mode (PostgreSQL only)
 */
export const caseInsensitiveContains = (value: string) => {
  return {
    contains: value,
    mode: 'insensitive' as const
  };
};

/**
 * Validates that the database provider supports case-insensitive queries.
 * This is a runtime check to provide better error messages.
 * 
 * @throws Error if DATABASE_URL doesn't indicate PostgreSQL
 */
export const validateDatabaseProvider = () => {
  const databaseUrl = process.env.DATABASE_URL || '';
  
  // Check if the connection string indicates PostgreSQL
  if (!databaseUrl.startsWith('postgresql://') && !databaseUrl.startsWith('postgres://')) {
    console.warn(
      '⚠️  WARNING: This application is designed for PostgreSQL. ' +
      'Case-insensitive search features may not work with other database providers. ' +
      'Current DATABASE_URL does not appear to be PostgreSQL.'
    );
  }
};
