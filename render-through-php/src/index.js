// https://github.com/WordPress/gutenberg/tree/master/packages/blocks
import { registerBlockType } from '@wordpress/blocks';
// https://github.com/WordPress/gutenberg/tree/master/packages/block-editor
import { RichText, InspectorControls, ColorPalette, MediaUpload } from '@wordpress/block-editor';
// https://github.com/WordPress/gutenberg/tree/master/packages/components
import { PanelBody, Button, RangeControl, SelectControl } from '@wordpress/components';
// https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/
import ServerSideRender from '@wordpress/server-side-render';

registerBlockType( 'gutenberg-examples/example-01-basic-esnext', {
	title: 'Basic Example',
	icon: 'smiley',
	category: 'design',
	attributes: {
		titleColor: {
			type: 'string',
			default: 'black',
		},
		postsPerPage: {
			type: 'number',
			default: 0.3
		},
		category: {
			type: 'string',
			default: 'uncategorized'
		},
	},

	edit({ attributes, setAttributes }) {

		const {
			titleColor,
			postsPerPage,
			category
		} = attributes;

		function onTitleColorChange( newColor ) {

			setAttributes({ titleColor: newColor });
		}
		function onpostsPerPageChange( newOpacity ) {

			setAttributes({ postsPerPage: newOpacity });
		}
		function onCatChange( newCategory ) {

			setAttributes({ category: newCategory });
		}

		return ([
			<InspectorControls>
				{/* https://developer.wordpress.org/block-editor/components/panel/#design-guidelines */}
				<PanelBody
					title={ 'Font Color Settings' }
					icon="admin-appearance"
					initialOpen={ true }>
					<p><strong>Select a Title color:</strong></p>
					<ColorPalette
						value={ titleColor }
						onChange={ onTitleColorChange } />
				</PanelBody>

				<PanelBody
					title={ 'Posts Control' }
					icon="admin-generic"
					initialOpen={ false }>
					<RangeControl
						label={ 'Total Post' }
						help={ 'Set how much posts you want to show.' }
						value={ postsPerPage }
						onChange={ onpostsPerPageChange }
						min={ 1 }
						max={ 100 }
						step={ 1 } />
				</PanelBody>

				<PanelBody
					title={ 'Category' }
					icon="category"
					initialOpen={ false }>
					<SelectControl
						label={ 'Category' }
						help={ 'Set a post category.' }
						value={ category }
						options={[
							{ label: 'Cat', value: 'uncategorized' },
							{ label: 'Dog', value: 'dog' },
							{ label: 'Bird', value: 'bird' },
						]}
						onChange={ onCatChange }
					/>
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
