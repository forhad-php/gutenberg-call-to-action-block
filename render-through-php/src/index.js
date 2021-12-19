/**
 * Steps::
 * ======
 * 1. Import the component
 * 2. Pre set attributes
 * 3. Set attribute in edit() method
 * 4. Set function in edit() method
 * 5.Set markup into <PanelBody> component
 */

// https://github.com/WordPress/gutenberg/tree/master/packages/blocks
import { registerBlockType } from '@wordpress/blocks';
// https://github.com/WordPress/gutenberg/tree/master/packages/block-editor
import { InspectorControls, ColorPalette } from '@wordpress/block-editor';
// https://github.com/WordPress/gutenberg/tree/master/packages/components
import { __experimentalHeading as Heading, PanelBody, RangeControl, SelectControl } from '@wordpress/components';
// https://developer.wordpress.org/block-editor/reference-guides/packages/packages-server-side-render/
import ServerSideRender from '@wordpress/server-side-render';
// https://reactjs.org/docs/hooks-reference.html#usestate
import { useState } from '@wordpress/element';

registerBlockType( 'gutenberg-examples/example-01-basic-esnext', {
	title: 'Basic Example',
	icon: 'smiley',
	category: 'design',
	attributes: {
		titleColor: {
			type: 'string',
			default: '#0170b9', // This value of property cannot read as null (Using 'hex')
		},
		postsPerPage: {
			type: 'number',
			default: null,
		},
		singleSelect: {
			type: 'string', // If the SelectControl is not multiple then use 'string'
			default: 'uncategorized'
		},
		category: {
			type: 'array', // If the SelectControl is multiple then use 'array'
			default: 'uncategorized'
		},
		theCategories: {
			type: 'array',
			default: 'uncategorized'
		},
	},

	edit({ attributes, setAttributes }) {

		const {
			titleColor,
			postsPerPage,
			singleSelect,
			category,
			theCategories
		} = attributes;

		function onTitleColorChange( newColor ) {

			setAttributes({ titleColor: newColor });
		}
		function onpostsPerPageChange( newOpacity ) {

			setAttributes({ postsPerPage: newOpacity });
		}
		function onmsChange( newsingleSelect ) {

			setAttributes({ singleSelect: newsingleSelect });
		}
		function onCatChange( newCategory ) {

			setAttributes({ category: newCategory });
		}

		// Use the below CHOSEN package to make the multiple select awesome.
		// https://harvesthq.github.io/chosen/
		function MyAuthorsListBase() {

			const { useSelect } = wp.data;

			const GMcategories = useSelect( ( select ) => {
				return select( 'core' ).getEntityRecords('taxonomy', 'category');
			}, [] );
		
			if ( ! GMcategories ) {
				return null;
			}

			return (
				<SelectControl
					multiple
					label={ 'Category List:' }
					help={ 'To select multiple categories press \'CTRL\'' }
					value={ theCategories }
					options={ GMcategories.map( ( GMcategory ) => (
								{ label: GMcategory.name, value: GMcategory.id }
							))}
					onChange={ theNewCategory => setAttributes( { theCategories: theNewCategory } ) }
				/>
			);
		}

		return ([
			// https://developer.wordpress.org/block-editor/reference-guides/components/
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
					title={ 'Single Select' }
					icon="category"
					initialOpen={ false }>
					<Heading>The Heading Component.</Heading>
					<SelectControl
						label={ 'Select Options' }
						help={ 'Set an option.' }
						value={ singleSelect }
						options={[
							{ label: 'Egg', value: 'egg' },
							{ label: 'Fox', value: 'fox' },
							{ label: 'Vimo', value: 'vimo' },
						]}
						onChange={ onmsChange }
					/>
				</PanelBody>
				
				<PanelBody
					title={ 'Multiple Select' }
					icon="category"
					initialOpen={ false }>
					<Heading>The Heading Component.</Heading>
					<SelectControl
						multiple
						label={ 'Category' }
						help={ 'Set categorys.' }
						value={ category }
						options={[
							{ label: 'Uncategorized', value: 'uncategorized' },
							{ label: 'Dog', value: 'dog' },
							{ label: 'Bird', value: 'bird' },
						]}
						onChange={ onCatChange }
					/>
				</PanelBody>

				<PanelBody
					title={ 'Select Categories' }
					icon="category"
					initialOpen={ false }>
					<Heading>Set one or multiple categories.</Heading>
					<MyAuthorsListBase />
				</PanelBody>

			</InspectorControls>,

			// Posts direct show from 'render_callback' on the editor.
			// Try This one: https://wordpress.stackexchange.com/questions/368875/serversiderender-does-not-render-preview-html-inside-gutenberg-block
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
