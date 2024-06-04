<?php
// Define the path to the SQLite database file
$database_file = 'db/log';

// Check if the database file exists and create a new one if not
if (!is_file($database_file)) {
    try {
        // Create the database file
        if (!file_exists('db') && !mkdir('db') && !is_dir('db')) {
            throw new RuntimeException(sprintf('Directory "%s" was not created', 'db'));
        }
        if (file_put_contents($database_file, null) === false) {
            throw new Exception("Failed to create the database file.");
        }
        echo "Database file created successfully.<br>";
    } catch (Exception $e) {
        // Handle any errors
        echo "Error: " . $e->getMessage();
        exit();
    }
}

try {
    // Connecting to the database
    $conn = new PDO('sqlite:' . $database_file);
    // Setting connection attributes
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected to the database successfully.<br>";

    // Query for creating the member table in the database if it does not exist yet
    $query = "CREATE TABLE IF NOT EXISTS `member` (
        `mem_id` INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        sender_name TEXT,
        sender_email TEXT,
        message TEXT
    )";
    // Executing the query
    $conn->exec($query);
    echo "Table 'member' created successfully.<br>";
} catch (PDOException $e) {
    // Handle any database connection errors
    echo "Connection failed: " . $e->getMessage();
    exit();
} catch (Exception $e) {
    // Handle any other errors
    echo "Error: " . $e->getMessage();
    exit();
}
?>
