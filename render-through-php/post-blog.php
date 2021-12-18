<?php
/*
Plugin Name: Gutenberg examples 01
*/

/**
 * Renders the post block on server.
 */
function post_layouts_block_render_block_core( $attributes ) {

	// Attention !!!
	// Simply return a shortcode?
	// Checkout below example!
	// return '[wpgp_slider id="243"]';

	// Get attributes value from editor page.
	$post_title_color = $attributes['titleColor'] ? $attributes['titleColor'] : 'blue';
	$posts_per_page   = $attributes['postsPerPage'] ? $attributes['postsPerPage'] : 6;
	$post_categories  = $attributes['theCategories'] ? $attributes['theCategories'] : '';

	$args = array(
		'posts_per_page' => $posts_per_page,
		'post_type'      => 'post',
		'cat'            => $post_categories,
	);

	$post_query = new WP_Query( $args );

	if ( $post_query->have_posts() ) {

		$list_items_markup = '<style>#forhad-guten-posts li {color: ' . $post_title_color . ';}</style><div id="forhad-guten-posts"><ul>';
		while ( $post_query->have_posts() ) {

			$post_query->the_post();
			$list_items_markup .= '<li>' . get_the_title() . '</li>';
		}
		$list_items_markup .= '</ul></div>';
		return $list_items_markup;
	}
}

// Register Block and initial setupment
function gutenberg_examples_01_register_block() {

	// automatically load dependencies and version.
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_register_script(
		'gutenberg-examples-01-esnext',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' ),
		true,
	);

	wp_register_style(
		'gutenberg-examples-01-editor',
		plugins_url( 'src/editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'src/editor.css' ), // filemtime() returns the last time of when its content was modified.
	);

	wp_register_style(
		'gutenberg-examples-01',
		plugins_url( 'src/style.css', __FILE__ ),
		array(),
		filemtime( plugin_dir_path( __FILE__ ) . 'src/style.css' ), // filemtime() returns the last time of when its content was modified.
	);

	register_block_type(
		'gutenberg-examples/example-01-basic-esnext',
		array(
			'api_version'     => 2,
			'style'           => 'gutenberg-examples-01',
			'editor_style'    => 'gutenberg-examples-01-editor',
			'editor_script'   => 'gutenberg-examples-01-esnext',
			'render_callback' => 'post_layouts_block_render_block_core',
		)
	);

}
add_action( 'init', 'gutenberg_examples_01_register_block' );
