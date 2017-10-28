CREATE TABLE `user_password` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_by` int(10) unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_password_username_unique` (`username`),
  KEY `user_password_user_id_foreign` (`user_id`),
  KEY `user_password_created_by_foreign` (`created_by`),
  KEY `user_password_updated_by_foreign` (`updated_by`),
  CONSTRAINT `user_password_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  CONSTRAINT `user_password_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`),
  CONSTRAINT `user_password_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
