const articleTable = `
CREATE TABLE IF NOT EXISTS articles(
    id INT(11) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
)
`;
exports.Tables = [articleTable];
exports.Relations = [];
