> Source: https://wholesomecode.ltd/blog/wp_query-gutenberg-equivalent-getentityrecords/

```JS
import { registerBlockType } from '@wordpress/blocks';
import { select, withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

registerBlockType( 'wholesomecode/wholesome-plugin', {
	title: __( 'Wholesome Plugin', 'wholesomecode' ),
	description: __( 'Just an Example Plugin', 'wholesomecode' ),
	category: 'common',
	icon: 'smiley',

	edit: withSelect( ( select ) => {
		const posts = select( 'core' ).getEntityRecords( 'postType', 'post', { 'per_page': 6 } );
		let media = {};
		posts.forEach( post => {
			media[ post.id ] = select('core').getMedia( post.featured_media );
		});
		return {
			posts,
			media
		};
	} )( props => {

		const { media, posts } = props;

		if ( ! posts || ! media ) {
			return (
				<p>{ __( 'Loading...', 'wholesomecode' ) }</p>
			);
		}

		return (
			<ul>
			{ posts.map(
				( post ) => {
					if ( media[ post.id ] ) {
						const imageThumbnailSrc = media[ post.id ].media_details.sizes.thumbnail.source_url;
						return (
							<li>
								<img src={ imageThumbnailSrc } />
								<a href={ post.link }>
									{ post.title.raw }
								</a>
							</li>
						)
					}
				}
			) }
			</ul>
		);
	} ),

	save() {
		return (
			<p>
				{ __( 'Wholesome Plugin – Nothing to see here.', 'wholesomecode' ) }
			</p>
		);
	},
} );

```
