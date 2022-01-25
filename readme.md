## To create style component and render styles : 

#### Run the command `npm install style-it --save`
#### And import it `import Style from 'style-it';`
#### Implementation →
```React
<div>
  <Style>{`#forhad-guten-posts li{color: ${titleColor} !important;}`}</Style>
  <ServerSideRender
      block={ "gutenberg-examples/example-01-basic-esnext" } />
</div>
```
