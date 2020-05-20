// https://github.com/WordPress/gutenberg/tree/master/packages/blocks
import { registerBlockType } from '@wordpress/blocks';
// https://github.com/WordPress/gutenberg/tree/master/packages/block-editor
import { RichText, InspectorControls, ColorPalette, MediaUpload } from '@wordpress/block-editor';
// https://github.com/WordPress/gutenberg/tree/master/packages/components
import { PanelBody, Button, RangeControl } from '@wordpress/components';

// Doc → https://developer.wordpress.org/block-editor/developers/block-api/block-registration/
registerBlockType( 'myguten/test-block', {
	title: 'Call to Action',
	description: 'Block to generate a custom Call to Action',
	icon: 'smiley',
	category: 'layout',

	/**
	 * Custom attributes :
	 * --------------------
	 *
	 * 1. How to create and set attribute
	 * 2. How to use the richText markup element
	 */
	attributes: {

		title: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},

		titleColor: {
			type: 'string',
			default: 'black',
		},

		body: {
			type: 'string',
			source: 'html',
			selector: 'p'
		},

		backgroundImage: {
			type: 'string',
			default: null
		},

		overlayColor: {
			type: 'string',
			default: 'black'
		},

		overlayOpacity: {
			type: 'number',
			default: 0.3
		},

	},

	edit ({ attributes, setAttributes }) {

		const {
			title,
			body,
			titleColor,
			backgroundImage,
			overlayColor,
			overlayOpacity
		} = attributes;

		// Custom functions
		function onChangeTitle( newTitle ) {

			setAttributes({ title: newTitle });
		}

		function onChangeBody( newBody ) {

			setAttributes({ body: newBody });
		}

		function onTitleColorChange( newColor ) {

			setAttributes({ titleColor: newColor });
		}

		function onSelectImage( newImage ) {

			setAttributes({ backgroundImage: newImage.sizes.full.url });
		}

		function onOverlayColorChange( newColor ) {

			setAttributes({ overlayColor: newColor });
		}

		function onOverlayOpacityChange( newOpacity ) {

			setAttributes({ overlayOpacity: newOpacity });
		}

		return ([

			<InspectorControls style={{ marginBottom: '40px' }}>
				{/* https://developer.wordpress.org/block-editor/components/panel/#design-guidelines */}
				<PanelBody title={ 'Font Color Settings' }>
					<p><strong>Select a Title color:</strong></p>
					<ColorPalette value={ titleColor }
								  onChange={ onTitleColorChange } />
				</PanelBody>

				<PanelBody title={ 'Background Image Settings' }>
					<p><strong>Select a Background Image:</strong></p>
					{/* https://github.com/WordPress/gutenberg/tree/master/packages/block-editor/src/components/media-upload#usage */}
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ backgroundImage }
						render={({ open }) => (
							<Button
								onClick={ open }
								icon="upload"
								className="editor-media-placeholder__button is-button is-default is-large">
								Background Image
							</Button>
						)} />
						<div style={{ marginTop: '20px', marginBottom: '40px' }}>
							<p><strong>Overlay Color:</strong></p>
							<ColorPalette value={ overlayColor }
								  onChange={ onOverlayColorChange } />
						</div>

						<RangeControl
							label={ 'Overlay Opacity' }
							value={ overlayOpacity }
							onChange={ onOverlayOpacityChange }
							min={ 0 }
							max={ 1 }
							step={ 0.01 } />
				</PanelBody>
			</InspectorControls>,

			<div class="cta-container" style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat'
			}}>

				<RichText key="editable"
						  tagName="h2"
						  placeholder="Your CTA Title"
						  value={ title }
						  onChange={ onChangeTitle }
						  style={{ color: titleColor }} />

				<RichText key="editable"
						  tagName="p"
						  placeholder="Your CTA Description"
						  value={ body }
						  onChange={ onChangeBody } />
			</div>
		]);
	},

	save({ attributes }) {

		const {
			title,
			body,
			titleColor,
			backgroundImage
		} = attributes;

		return (
			<div class="cta-container" style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat'
			}}>
				<h2 style={{ color: titleColor }}>{ title }</h2>
				<RichText.Content tagName="p"
								  value={ body } />
			</div>
		);
	}

} );