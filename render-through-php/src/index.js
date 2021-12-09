// https://github.com/WordPress/gutenberg/tree/master/packages/blocks
import { registerBlockType } from '@wordpress/blocks';
// https://github.com/WordPress/gutenberg/tree/master/packages/block-editor
import { RichText, InspectorControls, ColorPalette, MediaUpload } from '@wordpress/block-editor';
// https://github.com/WordPress/gutenberg/tree/master/packages/components
import { PanelBody, Button, RangeControl } from '@wordpress/components';
// https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/
import ServerSideRender from '@wordpress/server-side-render';

registerBlockType( 'gutenberg-examples/example-01-basic-esnext', {
	title: 'Basic Example',
	icon: 'smiley',
	category: 'design',

	/**
	 * Custom attributes :
	 * --------------------
	 *
	 * 1. How to create and set attribute
	 * 2. How to use the richText markup element
	 */
	 attributes: {

		titleColor: {
			type: 'string',
			default: 'black',
		},
		overlayOpacity: {
			type: 'number',
			default: 0.3
		},
	},

	edit({ attributes, setAttributes }) {

		const {
			titleColor,
			overlayOpacity
		} = attributes;

		function onTitleColorChange( newColor ) {

			setAttributes({ titleColor: newColor });
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
					<RangeControl
						label={ 'Overlay Opacity' }
						value={ overlayOpacity }
						onChange={ onOverlayOpacityChange }
						min={ 0 }
						max={ 1 }
						step={ 0.01 } />
				</PanelBody>
			</InspectorControls>,

			// Posts direct show from 'render_callback' on the editor.
			<div><p>Posts are showing here: yaaaaaa</p>
            <ServerSideRender
                block={ "gutenberg-examples/example-01-basic-esnext" } />
			</div>
		]);
	},

	// Render via PHP
    save() {
        return null;
    },

} );