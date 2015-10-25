/**
 * @author mrdoob / http://mrdoob.com/
 */

var Menubar = function ( editor ) {

	var container = new UI.Panel();
	container.setId( 'menubar' );

	container.add( new Menubar.File( editor ) );
	container.add( new Menubar.Edit( editor ) );
	container.add( new Menubar.Add( editor ) );
	container.add( new Menubar.Play( editor ) );
	container.add( new Menubar.Examples( editor ) );
	container.add( new Menubar.View( editor ) );
	container.add( new Menubar.Help( editor ) );


	// Add Terrain


	var terrainFileInput = document.createElement( 'input' );
	terrainFileInput.type = 'file';
	terrainFileInput.addEventListener( 'change', function ( event ) {
		var x = prompt('Terrain Cell Grid X: ');
		var z = prompt('Terrain Cell Grid Z: ');
		var result = editor.loader.loadFile( terrainFileInput.files[ 0 ], true, function(obj) {
			obj.userData = obj.userData || {};
			obj.userData.gameType = 'Terrain';
			obj.userData.TerrainX = parseInt(x);
			obj.userData.TerrainZ = parseInt(z);
			obj.name = obj.name.split('.')[0] + '.qb';
			obj.position.x = 32 + obj.userData.TerrainX * 64;
			obj.position.z = 32 - obj.userData.TerrainZ * 64;
		});
	} );
	var option = new UI.Panel();
	option.setClass( 'option' );
	option.setTextContent( 'Add Terrain' );
	option.onClick( function () {
		terrainFileInput.click();
	} );
	container.add( option );

	function AddStaticObj(text, scale) {
		// Add Static
		var staticFileInput = document.createElement( 'input' );
		staticFileInput.type = 'file';
		staticFileInput.addEventListener( 'change', function ( event ) {
			var result = editor.loader.loadFile( staticFileInput.files[ 0 ], true, function(obj) {
				obj.userData = obj.userData || {};
				obj.userData.gameType = 'Static';
				obj.name = obj.name.split('.')[0] + '.qb';
				obj.scale.x = obj.scale.y = obj.scale.z = scale;
			});
		} );
		var option = new UI.Panel();
		option.setClass( 'option' );
		option.setTextContent( text );
		option.onClick( function () {
			staticFileInput.click();
		} );
		container.add( option );
	}

	AddStaticObj('Add Building', 0.5);
	AddStaticObj('Add Detail', 1.0 / 6.0);




	var option = new UI.Panel();
	option.setClass( 'option' );
	option.setTextContent( 'Add Bound Box' );
	option.onClick( function () {
		var width = 5;
		var height = 5;
		var depth = 5;

		var widthSegments = 1;
		var heightSegments = 1;
		var depthSegments = 1;

		var geometry = new THREE.BoxGeometry( width, height, depth, widthSegments, heightSegments, depthSegments );
		var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial() );
		mesh.name = 'BB ' + editor.selected.children.length;

		mesh.parent = editor.selected;
		mesh.material.color.r = 0.0;
		mesh.material.color.g = 0.4666666666666667;
		mesh.material.color.b = 1.0;
		mesh.material.transparent = true;
		mesh.material.opacity = 0.5;
		mesh.userData = {
			gameType: 'Bounding Box'
		};
		editor.selected.children.push(mesh);

		// editor.addObject( mesh );
		editor.select( mesh );
	} );
	container.add( option );

	container.add( new Menubar.Status( editor ) );

	return container;

};
