-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 17-01-2024 a las 22:42:10
-- Versión del servidor: 8.0.34-0ubuntu0.20.04.1
-- Versión de PHP: 7.4.3-4ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `golden-marc`
--
CREATE DATABASE IF NOT EXISTS `golden-marc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `golden-marc`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `office`
--

CREATE TABLE `office` (
  `id` int NOT NULL,
  `key_office` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `office`
--

INSERT INTO `office` (`id`, `key_office`, `name`, `created_at`, `updated_at`) VALUES
(1, '001', 'Sucursal 1', '2023-10-26 22:30:01', '2023-10-26 22:30:01'),
(2, '002', 'Oficina 2', '2023-10-29 04:25:28', '2023-10-29 04:25:28'),
(3, '003', 'Oficina 3', '2023-10-29 04:26:40', '2023-10-29 04:26:40'),
(4, '004', 'Oficina 4', '2023-10-29 04:29:08', '2023-10-29 04:29:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `places`
--

CREATE TABLE `places` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `places`
--

INSERT INTO `places` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Oaxaca', '2023-10-31 05:10:28', '2023-10-31 05:10:28'),
(2, 'Cancun', '2023-11-01 04:09:18', '2023-11-01 04:09:18'),
(3, 'Francia', '2023-11-01 04:09:29', '2023-11-01 04:09:29'),
(4, 'Italia', '2023-11-01 04:09:37', '2023-11-01 04:09:37');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tickets`
--

CREATE TABLE `tickets` (
  `id` int NOT NULL,
  `key_ticket` varchar(45) NOT NULL,
  `price` float NOT NULL,
  `key_office` varchar(45) NOT NULL,
  `name_client` varchar(255) NOT NULL,
  `number_seat` int NOT NULL,
  `travels_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tickets`
--

INSERT INTO `tickets` (`id`, `key_ticket`, `price`, `key_office`, `name_client`, `number_seat`, `travels_id`, `created_at`, `updated_at`) VALUES
(1, '41d324ce-e934-4ce3-a320-61cea0f867ea', 450, '001', 'John Doe', 1, 19, '2023-12-08 04:06:46', '2023-12-08 04:06:46'),
(2, '593436d8-2e32-4d21-a401-7458fd370ed5', 450, '001', 'Gio', 10, 19, '2023-12-27 02:48:23', '2023-12-27 02:48:23'),
(3, 'dd23fb06-3575-430a-a211-58901cf53d2f', 450, '001', 'Gio', 10, 19, '2023-12-27 02:53:11', '2023-12-27 02:53:11'),
(4, '26faf930-56b3-4ac5-a7dd-0d1086d5e590', 450, '001', 'Gio', 11, 19, '2023-12-27 03:19:14', '2023-12-27 03:19:14'),
(5, '7da7f746-cd3e-4455-a061-5e2bc69f479a', 450, '001', 'Gio', 12, 19, '2023-12-27 03:44:25', '2023-12-27 03:44:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `travels`
--

CREATE TABLE `travels` (
  `id` int NOT NULL,
  `places_start_id` int NOT NULL,
  `places_end_id` int NOT NULL,
  `number_seats` int NOT NULL,
  `price_ticket` int NOT NULL,
  `date` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `travels`
--

INSERT INTO `travels` (`id`, `places_start_id`, `places_end_id`, `number_seats`, `price_ticket`, `date`, `created_at`, `updated_at`) VALUES
(17, 1, 2, 40, 450, '2023-11-05 16:00:00', '2023-11-05 04:26:46', '2023-11-05 04:26:46'),
(18, 1, 1, 40, 450, '2023-11-05 16:00:00', '2023-11-05 04:29:06', '2023-11-05 04:29:06'),
(19, 1, 2, 35, 300, '2023-12-10 00:00:00', '2023-12-08 04:01:01', '2023-12-08 04:01:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `key_office` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `password`, `role`, `created_at`, `updated_at`, `key_office`) VALUES
(10, 'Gio', 'Sandoval', 'gio1', '$2b$10$KLiUvsbkykBgnWlXUlIVa.9qPC36PT3E24YXce26xJeCIZ9wY86VO', 'CLIENT', '2023-10-28 03:42:06', '2023-10-28 03:42:06', '001'),
(11, 'Gio', 'Admin', 'gio2', '$2b$10$kJvjOHYuVkLPnZ8RKW2X6OdhnXRuKTNW6Cq3GBQhXXeuUU0l5OlzO', 'ADMIN', '2023-10-29 04:20:35', '2023-10-29 04:20:35', '001');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `office`
--
ALTER TABLE `office`
  ADD PRIMARY KEY (`id`),
  ADD KEY `key_office` (`key_office`);

--
-- Indices de la tabla `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_tickets_travels1_idx` (`travels_id`);

--
-- Indices de la tabla `travels`
--
ALTER TABLE `travels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_travels_places_idx` (`places_start_id`),
  ADD KEY `fk_travels_places1_idx` (`places_end_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_office1_idx` (`key_office`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `office`
--
ALTER TABLE `office`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `places`
--
ALTER TABLE `places`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `travels`
--
ALTER TABLE `travels`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `fk_tickets_travels1` FOREIGN KEY (`travels_id`) REFERENCES `travels` (`id`);

--
-- Filtros para la tabla `travels`
--
ALTER TABLE `travels`
  ADD CONSTRAINT `fk_travels_places` FOREIGN KEY (`places_start_id`) REFERENCES `places` (`id`),
  ADD CONSTRAINT `fk_travels_places1` FOREIGN KEY (`places_end_id`) REFERENCES `places` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_office1` FOREIGN KEY (`key_office`) REFERENCES `office` (`key_office`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
