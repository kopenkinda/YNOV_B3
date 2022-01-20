<?php

/**
 * Plugin Name: Discord Notifications
 * Plugin URI: https://ynov.com
 * Description: This plugin allows you to send a message to your Discord server when a new comment is posted.
 * Version: 1.0.0
 * Author: Dmitrii Kopenkin
 * Author URI: https://kopenkin.tech
 * License: GPL
 */

function dn_add_admin_menu()
{
	add_menu_page(
		'Discord Notifications',
		'Discord Notifications',
		'manage_options',
		'discord_notifications',
		'dn_options_page',
		'dashicons-format-chat'
	);
}


function dn_settings_init()
{
	register_setting('pluginPage', 'dn_settings');
	add_settings_section(
		'dn_pluginPage_section',
		__('Discord Notifications', 'discord-notifications'),
		'dn_settings_section_callback',
		'pluginPage'
	);

	add_settings_field(
		'dn_api_key_field',
		__('Put your discord webhook URL here', 'discord-notifications'),
		'dn_api_key_field_render',
		'pluginPage',
		'dn_pluginPage_section'
	);
}


function dn_api_key_field_render()
{
	$options = get_option('dn_settings');
?>
	<input type='text' name='dn_settings[dn_api_key_field]' value='<?= $options['dn_api_key_field']; ?>'>
<?php
}


function dn_settings_section_callback()
{
	echo __(':)', 'discord-notifications');
}


function dn_options_page()
{
?>
	<form action='options.php' method='post'>
		<?php
		settings_fields('pluginPage');
		do_settings_sections('pluginPage');
		submit_button();
		?>
	</form>
<?php
}

/**
 * Send a message to Discord
 * @param \WP_Comment|array|null $comment
 * @param string $webhook_url
 */
function dn_send_message($comment, $webhook_url)
{
	$timestamp = date("c", strtotime("now"));
	$json_data = json_encode([
		"content" => $comment->comment_content,
		"username" => "Your wordpress ite",
		"tts" => false,
		"embeds" => [
			[
				"title" => "You got a comment",
				"type" => "rich",
				"description" => $comment->comment_author . " ( " . $comment->comment_author_email . " )",
				"url" => get_permalink($comment->comment_post_ID),
				"timestamp" => $timestamp,
				"color" => hexdec("33ffcc"),
				"author" => [
					"name" => "Your wordpress site",
					"url" => "https://localhost:6262/"
				],
			]
		]
	], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
	$ch = curl_init($webhook_url);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
	curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$response = curl_exec($ch);
	curl_close($ch);
}

function dn_notify_on_comment($comment_id, $comment_approved)
{
	if (!$comment_approved) {
		$comment = get_comment($comment_id);
		dn_send_message($comment, get_option('dn_settings')['dn_api_key_field']);
	}
}

/**
 * Register Actions
 */

add_action('admin_menu', 'dn_add_admin_menu');
add_action('admin_init', 'dn_settings_init');

add_action('comment_post', 'dn_notify_on_comment', 10, 2);
