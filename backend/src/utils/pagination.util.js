const { queryMany } = require("./db");

async function getPaginatedList({ table_name, select_clause = "*", search_fields = [], limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const offset = (safe_page - 1) * safe_limit;

  let main_sql = `SELECT ${select_clause} FROM ${table_name}`;
  let count_sql = `SELECT COUNT(*) as total FROM ${table_name}`;
  const main_params = [];
  const count_params = [];

  if (search && search_fields.length > 0) {
    const search_pattern = `%${search}%`;
    const where_clause = " WHERE " + search_fields.map(field => `${field} LIKE ?`).join(" OR ");
    main_sql += where_clause;
    count_sql += where_clause;

    search_fields.forEach(() => {
      main_params.push(search_pattern);
      count_params.push(search_pattern);
    });
  }

  main_sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  main_params.push(safe_limit, offset);

  const [items, count_result] = await Promise.all([
    queryMany(main_sql, main_params),
    queryMany(count_sql, count_params)
  ]);

  return {
    limit: safe_limit,
    page: safe_page,
    total: count_result[0].total,
    items
  };
}

module.exports = {
  getPaginatedList
};
