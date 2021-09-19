-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2021-09-19 05:28:00
-- 服务器版本： 10.1.38-MariaDB
-- PHP 版本： 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `art_sharing`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin_signin_data`
--

CREATE TABLE `admin_signin_data` (
  `id` int(50) NOT NULL,
  `admin_username` varchar(50) NOT NULL,
  `signin_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin_signin_data`
--

INSERT INTO `admin_signin_data` (`id`, `admin_username`, `signin_time`) VALUES
(1, 'admin01', '2021-08-17 14:40:37'),
(2, 'admin01', '2021-08-17 14:42:31'),
(3, 'admin01', '2021-08-17 14:44:57'),
(4, 'admin01', '2021-08-17 14:50:42'),
(5, 'admin01', '2021-08-17 14:53:03'),
(6, 'admin01', '2021-08-17 15:07:26'),
(7, 'admin01', '2021-08-17 15:27:57'),
(8, 'admin01', '2021-08-17 15:31:35'),
(9, 'admin01', '2021-08-18 21:14:45'),
(10, 'admin01', '2021-08-20 16:32:54'),
(11, 'admin01', '2021-08-23 15:24:24');

-- --------------------------------------------------------

--
-- 表的结构 `admin_user`
--

CREATE TABLE `admin_user` (
  `id` int(5) NOT NULL,
  `admin_username` varchar(50) NOT NULL,
  `admin_password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admin_user`
--

INSERT INTO `admin_user` (`id`, `admin_username`, `admin_password`) VALUES
(1, 'admin01', '70873e8580c9900986939611618d7b1e');

-- --------------------------------------------------------

--
-- 表的结构 `comment_data_sheet`
--

CREATE TABLE `comment_data_sheet` (
  `id` int(100) NOT NULL,
  `comment_works_id` varchar(1000) NOT NULL,
  `comment_email` varchar(1000) NOT NULL,
  `comment_content` varchar(1000) NOT NULL,
  `comment_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `comment_data_sheet`
--

INSERT INTO `comment_data_sheet` (`id`, `comment_works_id`, `comment_email`, `comment_content`, `comment_time`) VALUES
(1, '202108190852082', 'yuhaoyuang@163.com', '朋克风格的房间真的很科技感。', '2021-08-19 22:00:33'),
(2, '202108190852082', 'yuhaoyuang@163.com', '要是我的房间也有那么多台电脑就好了', '2021-08-19 22:03:17'),
(3, '202108190852082', 'yuhaoyuang@163.com', '椅子很不错', '2021-08-19 22:06:55'),
(4, '202108190852082', 'yuhaoyuang@163.com', '怎么画出来的呀？', '2021-08-19 22:07:24'),
(5, '202108190852082', 'yuhaoyuang@163.com', '大神呀', '2021-08-19 22:08:48'),
(8, '202108190852082', 'yuhaoyuang@163.com', '加油', '2021-08-19 22:13:04'),
(9, '202108190852082', 'yuhaoyuang@163.com', '新发布的评论', '2021-08-19 22:40:55'),
(10, '202108190852082', 'yuhaoyuang@163.com', 'demo2', '2021-08-19 22:44:21'),
(11, '202108190852082', 'yuhaoyuang@163.com', '的mo3', '2021-08-19 22:47:04'),
(12, '202108190852082', 'yuhaoyuang@163.com', '爱你', '2021-08-19 22:47:40'),
(13, '202108190851101', 'yuhaoyuang@163.com', '排球少年太强了', '2021-08-19 22:50:34'),
(14, '202108190855444', 'yuhaoyuang@163.com', '很真实', '2021-08-21 14:34:35');

-- --------------------------------------------------------

--
-- 表的结构 `data_sheet`
--

CREATE TABLE `data_sheet` (
  `id` int(5) NOT NULL COMMENT '序号',
  `works_id` varchar(50) NOT NULL COMMENT '作品id',
  `works_name` varchar(50) NOT NULL COMMENT '作品名',
  `user_email` varchar(50) NOT NULL COMMENT '用户邮箱',
  `works_introduce` varchar(5000) NOT NULL COMMENT '作品介绍',
  `works_datails` varchar(5000) NOT NULL COMMENT '作品详情',
  `works_label` varchar(5000) NOT NULL COMMENT '作品标签',
  `release_time` datetime NOT NULL COMMENT '发布时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `data_sheet`
--

INSERT INTO `data_sheet` (`id`, `works_id`, `works_name`, `user_email`, `works_introduce`, `works_datails`, `works_label`, `release_time`) VALUES
(13, '202108190851101', '排球少年', 'yuhaoyuang@163.com', '排球同人画', '{\"paint\":{\"title\":\"画笔\",\"content\":\"手绘板\"},\"timeuse\":{\"title\":\"用时\",\"content\":\"三天\"}}', '{\"theme\":{\"title\":\"题材\",\"content\":\"人物画\"},\"worksform\":{\"title\":\"形式\",\"content\":\"漫画\"}}', '2021-08-19 15:01:06'),
(14, '202108190852082', '赛博朋克', 'yuhaoyuang@163.com', '赛博朋克风格', '{\"paint\":{\"title\":\"画笔\",\"content\":\"手绘板\"},\"timeuse\":{\"title\":\"用时\",\"content\":\"一周\"}}', '{\"theme\":{\"title\":\"题材\",\"content\":\"风景画\"},\"worksform\":{\"title\":\"形式\",\"content\":\"插画\"}}', '2021-08-19 15:01:12');

-- --------------------------------------------------------

--
-- 表的结构 `data_sheet_tbr`
--

CREATE TABLE `data_sheet_tbr` (
  `id` int(5) NOT NULL COMMENT '序号',
  `works_id` varchar(50) NOT NULL COMMENT '作品id',
  `works_name` varchar(50) NOT NULL COMMENT '作品名',
  `user_email` varchar(50) NOT NULL COMMENT '提交用户邮箱',
  `works_introduce` varchar(5000) DEFAULT NULL COMMENT '作品简介',
  `works_datails` varchar(5000) DEFAULT NULL COMMENT '作品详情',
  `works_label` varchar(5000) DEFAULT NULL COMMENT '作品标签',
  `submitsion_time` datetime NOT NULL COMMENT '提交时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='待审核作品数据表';

--
-- 转存表中的数据 `data_sheet_tbr`
--

INSERT INTO `data_sheet_tbr` (`id`, `works_id`, `works_name`, `user_email`, `works_introduce`, `works_datails`, `works_label`, `submitsion_time`) VALUES
(1, '202108231015261', '造园记', 'yuhaoyuang@163.com', '21度美术馆展品', '{\"pigment\":{\"title\":\"颜料\",\"content\":\"油画颜料\"}}', '{\"material\":{\"title\":\"材料\",\"content\":\"油画\"}}', '2021-08-23 16:15:26');

-- --------------------------------------------------------

--
-- 表的结构 `user_data`
--

CREATE TABLE `user_data` (
  `id` int(5) NOT NULL COMMENT '序号',
  `user_name` varchar(50) NOT NULL COMMENT '昵称',
  `user_password` varchar(50) NOT NULL COMMENT '密码',
  `user_email` varchar(50) NOT NULL COMMENT '邮箱'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_data`
--

INSERT INTO `user_data` (`id`, `user_name`, `user_password`, `user_email`) VALUES
(1, '画画天才', '70873e8580c9900986939611618d7b1e', 'yuhaoyuang@163.com');

-- --------------------------------------------------------

--
-- 表的结构 `user_datails`
--

CREATE TABLE `user_datails` (
  `id` int(5) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_head_portrait` varchar(50) NOT NULL DEFAULT 'default.svg',
  `user_address` varchar(50) NOT NULL DEFAULT 'null',
  `user_introduce` varchar(50) NOT NULL DEFAULT 'null',
  `user_label` varchar(5000) NOT NULL DEFAULT 'null'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_datails`
--

INSERT INTO `user_datails` (`id`, `user_name`, `user_email`, `user_head_portrait`, `user_address`, `user_introduce`, `user_label`) VALUES
(1, '画画天才', 'yuhaoyuang@163.com', 'yuhaoyuang@163.jpg', '测试', '测试', '素描/插画/水彩');

-- --------------------------------------------------------

--
-- 表的结构 `user_signin_data`
--

CREATE TABLE `user_signin_data` (
  `id` int(5) NOT NULL,
  `user_email` varchar(50) NOT NULL,
  `signin_time` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user_signin_data`
--

INSERT INTO `user_signin_data` (`id`, `user_email`, `signin_time`) VALUES
(1, 'yuhaoyuang@163.com', '2021-08-03 16:24:50.000000'),
(2, 'yuhaoyuang@163.com', '2021-08-03 16:30:37.000000'),
(3, 'yuhaoyuang@163.com', '2021-08-03 16:35:49.000000'),
(4, 'yuhaoyuang@163.com', '2021-08-03 16:48:02.000000'),
(5, 'yuhaoyuang@163.com', '2021-08-03 16:48:57.000000'),
(6, 'yuhaoyuang@163.com', '2021-08-03 16:49:05.000000'),
(7, 'yuhaoyuang@163.com', '2021-08-04 15:10:29.000000'),
(8, 'yuhaoyuang@163.com', '2021-08-04 15:11:53.000000'),
(9, 'yuhaoyuang@163.com', '2021-08-04 15:12:12.000000'),
(10, 'yuhaoyuang@163.com', '2021-08-04 15:12:14.000000'),
(11, 'yuhaoyuang@163.com', '2021-08-04 15:12:14.000000'),
(12, 'yuhaoyuang@163.com', '2021-08-04 15:12:15.000000'),
(13, 'yuhaoyuang@163.com', '2021-08-04 15:12:31.000000'),
(14, 'yuhaoyuang@163.com', '2021-08-04 15:13:12.000000'),
(15, 'yuhaoyuang@163.com', '2021-08-04 15:15:32.000000'),
(16, 'yuhaoyuang@163.com', '2021-08-04 15:20:55.000000'),
(17, 'yuhaoyuang@163.com', '2021-08-04 15:21:20.000000'),
(18, 'yuhaoyuang@163.com', '2021-08-04 15:21:44.000000'),
(19, 'yuhaoyuang@163.com', '2021-08-04 15:22:01.000000'),
(20, 'yuhaoyuang@163.com', '2021-08-04 15:25:23.000000'),
(21, 'yuhaoyuang@163.com', '2021-08-04 15:25:48.000000'),
(22, 'yuhaoyuang@163.com', '2021-08-04 15:48:26.000000'),
(23, 'yuhaoyuang@163.com', '2021-08-04 15:49:03.000000'),
(24, 'yuhaoyuang@163.com', '2021-08-04 15:50:58.000000'),
(25, 'yuhaoyuang@163.com', '2021-08-04 15:52:12.000000'),
(26, 'yuhaoyuang@163.com', '2021-08-04 15:52:38.000000'),
(27, 'yuhaoyuang@163.com', '2021-08-04 15:52:56.000000'),
(28, 'yuhaoyuang@163.com', '2021-08-04 15:53:05.000000'),
(29, 'yuhaoyuang@163.com', '2021-08-04 15:53:41.000000'),
(30, 'yuhaoyuang@163.com', '2021-08-04 15:58:43.000000'),
(31, 'yuhaoyuang@163.com', '2021-08-09 11:01:19.000000'),
(32, '1181840216@qq.com', '2021-08-09 16:25:48.000000'),
(33, '1181840216@qq.com', '2021-08-09 16:35:44.000000'),
(34, '1181840216@qq.com', '2021-08-09 16:39:01.000000'),
(35, 'yuhaoyuang@163.com', '2021-08-10 16:59:38.000000'),
(36, 'yuhaoyuang@163.com', '2021-08-10 17:10:51.000000'),
(37, 'yuhaoyuang@163.com', '2021-08-10 20:39:48.000000'),
(38, 'yuhaoyuang@163.com', '2021-08-10 20:40:35.000000'),
(39, 'yuhaoyuang@163.com', '2021-08-10 20:58:46.000000'),
(40, 'yuhaoyuang@163.com', '2021-08-10 21:01:34.000000'),
(41, 'yuhaoyuang@163.com', '2021-08-15 15:53:38.000000'),
(42, 'yuhaoyuang@163.com', '2021-08-15 15:55:10.000000'),
(43, 'yuhaoyuang@163.com', '2021-08-15 16:03:53.000000'),
(44, 'yuhaoyuang@163.com', '2021-08-15 16:05:51.000000'),
(45, 'yuhaoyuang@163.com', '2021-08-15 16:12:39.000000'),
(46, 'yuhaoyuang@163.com', '2021-08-15 16:13:20.000000'),
(47, 'yuhaoyuang@163.com', '2021-08-17 12:04:11.000000'),
(48, 'yuhaoyuang@163.com', '2021-08-17 14:47:49.000000'),
(49, 'yuhaoyuang@163.com', '2021-08-17 16:43:27.000000'),
(50, 'yuhaoyuang@163.com', '2021-08-17 17:57:11.000000'),
(51, '1181840216@qq.com', '2021-08-19 14:53:50.000000'),
(52, 'yuhaoyuang@163.com', '2021-08-19 21:19:39.000000'),
(53, 'yuhaoyuang@163.com', '2021-08-19 21:46:16.000000'),
(54, 'yuhaoyuang@163.com', '2021-08-19 23:05:25.000000'),
(55, 'yuhaoyuang@163.com', '2021-08-20 15:51:22.000000'),
(56, 'yuhaoyuang@163.com', '2021-08-20 16:01:40.000000'),
(57, 'yuhaoyuang@163.com', '2021-08-20 16:48:16.000000'),
(58, '1181840216@qq.com', '2021-08-21 13:04:56.000000'),
(59, 'yuhaoyuang@163.com', '2021-08-21 13:56:34.000000'),
(60, 'yuhaoyuang@163.com', '2021-08-21 16:03:50.000000'),
(61, 'demouser@qq.com', '2021-08-23 17:15:09.000000');

--
-- 转储表的索引
--

--
-- 表的索引 `admin_signin_data`
--
ALTER TABLE `admin_signin_data`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `admin_user`
--
ALTER TABLE `admin_user`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `comment_data_sheet`
--
ALTER TABLE `comment_data_sheet`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `data_sheet`
--
ALTER TABLE `data_sheet`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `data_sheet_tbr`
--
ALTER TABLE `data_sheet_tbr`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user_data`
--
ALTER TABLE `user_data`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- 表的索引 `user_datails`
--
ALTER TABLE `user_datails`
  ADD PRIMARY KEY (`id`,`user_email`);

--
-- 表的索引 `user_signin_data`
--
ALTER TABLE `user_signin_data`
  ADD UNIQUE KEY `id` (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `admin_signin_data`
--
ALTER TABLE `admin_signin_data`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- 使用表AUTO_INCREMENT `admin_user`
--
ALTER TABLE `admin_user`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `comment_data_sheet`
--
ALTER TABLE `comment_data_sheet`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用表AUTO_INCREMENT `data_sheet`
--
ALTER TABLE `data_sheet`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT COMMENT '序号', AUTO_INCREMENT=15;

--
-- 使用表AUTO_INCREMENT `data_sheet_tbr`
--
ALTER TABLE `data_sheet_tbr`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT COMMENT '序号', AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `user_data`
--
ALTER TABLE `user_data`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT COMMENT '序号', AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `user_datails`
--
ALTER TABLE `user_datails`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `user_signin_data`
--
ALTER TABLE `user_signin_data`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
