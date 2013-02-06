/* jshint bitwise: false */
define([
    'goo/util/Promise',
    'goo/util/Ajax',
    'goo/renderer/MeshData',
  ],
/** @lends MeshLoader */
function(
  Promise,
  Ajax,
  MeshData
  ) {
  "use strict"
  
  /*
   *
   */
  function MeshLoader(rootUrl) {
    Promis.call(this);
    
    this._rootUrl = rootUrl || '';
    
  };
  MeshLoader.prototype = new Promise();
  MeshLoader.prototype.constructor = MeshLoader;
  
  MeshLoader.prototype.setRootUrl = function(rootUrl) {
    if(rootUrl) this._rootUrl = rootUrl;
    return this;
  }
  
  MeshLoader.prototype.load = function(sourcePath) {
    var that = this;

    if(!sourcePath) this._reject('URL not specified');
    
    var a = new Ajax({
      url: this._rootUrl + sourcePath
    })
    .done(function(request) {
      that._parseMesh(that._handleRequest(request))
        .done(function(data) {
          that._resolve(data);
        })
        .fail(function(data) {
          that._reject(data);
        });
    })
    .fail(function(data) {
      that._reject(data.responseText);
    })
    
    return this
  };
  
  MeshLoader.prototype._handleRequest = function(request) {
    var json = null;
    
    if(request && request.getResponseHeader('Content-Type') == 'application/json')
    {
      try
      {
        json = JSON.parse(request.responseText);
      }
      catch (e)
      {
        this._reject('Couldn\'t load following data to JSON:\n' + request.responseText);
        
      }
    }
    
    return json;
  };
  
  
  MeshLoader.prototype._parseMesh = function(meshDataSource) {
		var that = this;
    var promise = new Promise();
    var promises = {};
  
		var meshData;

		/*var waitCounter = createWaitCounter(function() {

			var meshDataComponent = new MeshDataComponent(meshData);

			say('MeshDataComponent loaded:');
			say(meshDataComponent);
			if(callback) callback(meshDataComponent);
		});*/

		if(meshDataSource && Object.keys(meshDatatSource).length)
		{
			var value;
			//waitCounter.setCount(Object.keys(meshDataComponentSource).length);
			for(var attribute in meshDataSource)
			{
				value = meshDataSource[attribute];

				if(attribute == 'mesh')
				{
				  promises[attribute] = new Ajax( { url : this._rootUrl + value } );
				}
			}
			
			Promise.when(promises.mesh)
  			.done(function(data) {
          that.useCompression = data.compressed || false;
        
          if (that.useCompression) {
            that.compressedVertsRange = data.CompressedVertsRange || (1 << 14) - 1; // int
            that.compressedColorsRange = data.CompressedColorsRange || (1 << 8) - 1; // int
            that.compressedUnitVectorRange = data.CompressedUnitVectorRange || (1 << 10) - 1; // int
          }
  				meshData = that._parseMeshData(data, 0, 'Mesh');
  				promise._resolve(meshData)
  		  })
  			.fail(function(data) {
    		  promise._reject(data);
    		});
		}
		return promise;
  };
  
  MeshLoader.prototype._parseMeshData = function (object, weightsPerVert, type) {
    
    var vertexCount = object.data.VertexCount; // int
		if (vertexCount === 0) {
			return null;
		}
		
		var indexCount = object.data.IndexLengths ? object.data.IndexLengths[0] : 0;

		var attributeMap = {};
		if (object.data.Vertices) {
			attributeMap.POSITION = MeshData.createAttribute(3, 'Float');
		}
		if (object.data.Normals) {
			attributeMap.NORMAL = MeshData.createAttribute(3, 'Float');
		}
		if (object.data.Tangents) {
			attributeMap.TANGENT = MeshData.createAttribute(4, 'Float');
		}
		if (object.data.Colors) {
			attributeMap.COLOR = MeshData.createAttribute(4, 'Float');
		}
		if (weightsPerVert > 0 && object.data.Weights) {
			attributeMap.WEIGHTS = MeshData.createAttribute(4, 'Float');
		}
		if (weightsPerVert > 0 && object.data.Joints) {
			attributeMap.JOINTIDS = MeshData.createAttribute(4, 'Short');
		}
		if (object.data.TextureCoords) {
			for (var i in object.data.TextureCoords) {
				attributeMap['TEXCOORD' + i] = MeshData.createAttribute(2, 'Float');
			}
		}

		var meshData = new MeshData(attributeMap, vertexCount, indexCount);

		if (object.data.Vertices) {
			if (this.useCompression) {
				var offsetObj = object.data.VertexOffsets;
				JsonUtils.fillAttributeBufferFromCompressedString(object.data.Vertices, meshData, MeshData.POSITION, [object.data.VertexScale,
						object.data.VertexScale, object.data.VertexScale], [offsetObj.xOffset, offsetObj.yOffset, offsetObj.zOffset]);
			} else {
				JsonUtils.fillAttributeBuffer(object.data.Vertices, meshData, MeshData.POSITION);
			}
		}
		if (object.data.Weights) {
			if (this.useCompression) {
				var offset = 0;
				var scale = 1 / this.compressedVertsRange;

				JsonUtils.fillAttributeBufferFromCompressedString(object.data.Weights, meshData, MeshData.WEIGHTS, [scale], [offset]);
			} else {
				JsonUtils.fillAttributeBuffer(object.data.Weights, meshData, MeshData.WEIGHTS);
			}
		}
		if (object.data.Normals) {
			if (this.useCompression) {
				var offset = 1 - (this.compressedUnitVectorRange + 1 >> 1);
				var scale = 1 / -offset;

				JsonUtils.fillAttributeBufferFromCompressedString(object.data.Normals, meshData, MeshData.NORMAL, [scale, scale, scale], [offset, offset,
						offset]);
			} else {
				JsonUtils.fillAttributeBuffer(object.data.Normals, meshData, MeshData.NORMAL);
			}
		}
		if (object.data.Tangents) {
			if (this.useCompression) {
				var offset = 1 - (this.compressedUnitVectorRange + 1 >> 1);
				var scale = 1 / -offset;

				JsonUtils.fillAttributeBufferFromCompressedString(object.data.Tangents, meshData, MeshData.TANGENT, [scale, scale, scale, scale], [offset,
						offset, offset, offset]);
			} else {
				JsonUtils.fillAttributeBuffer(object.data.Tangents, meshData, MeshData.TANGENT);
			}
		}
		if (object.data.Colors) {
			if (this.useCompression) {
				var offset = 0;
				var scale = 255 / (this.compressedColorsRange + 1);
				JsonUtils.fillAttributeBufferFromCompressedString(object.data.Colors, meshData, MeshData.COLOR, [scale, scale, scale, scale], [offset,
						offset, offset, offset]);
			} else {
				JsonUtils.fillAttributeBuffer(object.data.Colors, meshData, MeshData.COLOR);
			}
		}
		if (object.data.TextureCoords) {
			var textureUnits = object.data.TextureCoords;
			if (this.useCompression) {
				for (var i = 0; i < textureUnits.length; i++) {
					var texObj = textureUnits[i];
					JsonUtils.fillAttributeBufferFromCompressedString(texObj.UVs, meshData, 'TEXCOORD' + i, texObj.UVScales, texObj.UVOffsets);
				}
			} else {
				for (var i = 0; i < textureUnits.length; i++) {
					JsonUtils.fillAttributeBuffer(textureUnits[i], meshData, 'TEXCOORD' + i);
				}
			}
		}
		if (object.data.Joints) {
			var buffer = meshData.getAttributeBuffer(MeshData.JOINTIDS);
			var data;
			if (this.useCompression) {
				data = JsonUtils.getIntBufferFromCompressedString(object.data.Joints, 32767);
			} else {
				data = JsonUtils.getIntBuffer(object.data.Joints, 32767);
			}

			if (type === 'SkinnedMesh') {
				// map these joints to local.
				var localJointMap = [];
				var localIndex = 0;
				for (var i = 0, max = data.length; i < max; i++) {
					var jointIndex = data[i];
					if (localJointMap[jointIndex] === undefined) {
						localJointMap[jointIndex] = localIndex++;
					}

					buffer.set([localJointMap[jointIndex]], i);
				}

				// store local map
				var localMap = [];
				for (var jointIndex = 0; jointIndex < localJointMap.length; jointIndex++) {
					localIndex = localJointMap[jointIndex];
					if (localIndex !== undefined) {
						localMap[localIndex] = jointIndex;
					}
				}

				meshData.paletteMap = localMap;
			} else {
				for (var i = 0, max = data.capacity(); i < max; i++) {
					buffer.putCast(i, data.get(i));
				}
			}
		}

		if (object.data.Indices) {
			if (this.useCompression) {
				meshData.getIndexBuffer().set(JsonUtils.getIntBufferFromCompressedString(object.data.Indices, vertexCount));
			} else {
				meshData.getIndexBuffer().set(JsonUtils.getIntBuffer(object.data.Indices, vertexCount));
			}
		}

		if (object.data.IndexModes) {
			var modes = object.data.IndexModes;
			if (modes.length === 1) {
				meshData.indexModes[0] = modes[0];
			} else {
				var modeArray = [];
				for (var i = 0; i < modes.length; i++) {
					modeArray[i] = modes[i];
				}
				meshData.indexModes = modeArray;
			}
		}

		if (object.data.IndexLengths) {
			var lengths = object.data.IndexLengths;
			var lengthArray = [];
			for (var i = 0; i < lengths.length; i++) {
				lengthArray[i] = lengths[i];
			}
			meshData.indexLengths = lengthArray;
		}
		return meshData;
  };
  
  return MeshLoader
});