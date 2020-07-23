-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: d81702.mysql.zonevs.eu
-- Loomise aeg: Juuli 23, 2020 kell 01:29 PL
-- Serveri versioon: 10.4.12-MariaDB-log
-- PHP versioon: 7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Andmebaas: `d81702_chat`
--

-- --------------------------------------------------------

--
-- Tabeli struktuur tabelile `chat_content`
--

CREATE TABLE `chat_content` (
  `sid` int(11) NOT NULL,
  `username` text NOT NULL,
  `message` text NOT NULL,
  `date` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabeli struktuur tabelile `chat_used_words`
--

CREATE TABLE `chat_used_words` (
  `sid` int(11) NOT NULL,
  `word` text NOT NULL,
  `counter` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indeksid tõmmistatud tabelitele
--

--
-- Indeksid tabelile `chat_content`
--
ALTER TABLE `chat_content`
  ADD PRIMARY KEY (`sid`);

--
-- Indeksid tabelile `chat_used_words`
--
ALTER TABLE `chat_used_words`
  ADD PRIMARY KEY (`sid`);

--
-- AUTO_INCREMENT tõmmistatud tabelitele
--

--
-- AUTO_INCREMENT tabelile `chat_content`
--
ALTER TABLE `chat_content`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT tabelile `chat_used_words`
--
ALTER TABLE `chat_used_words`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
