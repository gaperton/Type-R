<script type="text/javascript">
	var brand = document.getElementsByClassName("Navbar__brand")[ 0 ].parentElement;

	var img1 = document.createElement( 'img' );
	img1.src = "images/volicon_verizon_dm.png";
	img1.style = "float: left; margin-top: 10px;";
	
	var img2 = document.createElement( 'img' );
	img2.src = "images/tr-logo-light.png";
	img2.style = "float: left; margin-top: 12px; width: 29px; margin-left: 17px; margin-right: -10px;";
	
	brand.prepend( img2 );
	brand.prepend( img1 );
</script>

<p class="lead">
	<strong>Type-R</strong> is the modern state management JS framework designed to handle both UI and domain application state.
</p>

<hr/>
<br/>
<div class=row>
<div class=col-third>

### JSON Serialization

* State is serializable by default.
* Both nested JSON and relations by id are supported.

</div>
<div class=col-third>

### Validation

* Declarative validation checks.
* Validation is lazily evaluated.

</div>
<div class=col-third>

### Dynamic type-safety

* State elements are _typed_.
* Client-server communication is guarded against
type errors from both ends.

</div>
</div>

<div class=row>
<div class=col-third>

### Observable Changes

* Changes are observable by default. 

</div>
<div class=col-third>

### Scalability

* Not dependent on singletons.
* Stores are optional and can be created dynamically.

</div>
<div class=col-third>

### Performance

* 10 times faster than BackboneJS in all browsers.

</div>
</div>

<hr/>
