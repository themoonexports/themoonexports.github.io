<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'themoonexports_589');

/** MySQL database username */
define('DB_USER', 'themoonexports_589');

/** MySQL database password */
define('DB_PASSWORD', 'S701xM[-5p');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'tgjrjgnl2ov8cx5yrttuh4dr6ka04hzaomqokihwt01byzbglflxh0327zccbivg');
define('SECURE_AUTH_KEY',  'rmxm3wz64nxrisnyardo3p1b8rdnlbsom3ly3rjbx53kbbdocdlpkacbkw4xkazb');
define('LOGGED_IN_KEY',    'tihf1ydaeuoh0yq7lhhu9q3suw5lizb6abwnbwtgobvhfzkwieuprcwvt86r40yc');
define('NONCE_KEY',        'dibhbvxmlxrc7sm48cvsq0k5std6yfqsi6mkfhhy9mrmvdaoeyutupwfeslcag5y');
define('AUTH_SALT',        'ygdwlewlzni5417lk3ervp8ds0bjezttyuwe0gwuql8doxddyyr5n8fsuaeusdoi');
define('SECURE_AUTH_SALT', '4at8h8e883xwjbojo8kqsgmg2ckltkyaph9xqa3qdmjxiyyc9k0muwhcqm9wbqoh');
define('LOGGED_IN_SALT',   'yw5uugqibturnikmv5i8dfl9fuujf85yvrtpfmqbb1faz9gmbewgk4xxmnouwpud');
define('NONCE_SALT',       'n6onptpkdtxbgnk5io5nhhr8azf2gczg9j6ishqei8nq3w0ub4abbvki7jde0vxh');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wpgs_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
