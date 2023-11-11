
tinymce.PluginManager.add('fileupload', function(editor, url) {
	var pluginName='文件上传';
	var baseURL=tinymce.baseURL;
	var iframe1 = baseURL+'/plugins/fileupload/fileupload.html';
	var openDialog = function() {
		localStorage.removeItem('fileList')		
		return editor.windowManager.openUrl({	
			title: pluginName,
			size: 'large',
			width: 1000,
			height: 500,
			url:iframe1,
			buttons: [
				{
					type: 'cancel',
					text: 'Close'
				},
				{
					type: 'custom',
					text: 'Save',
					name: 'save',
					primary: true
				},
			],
			onAction: function (api, details) {
				switch (details.name) {
					case 'save':
						const fileList = JSON.parse(localStorage.getItem("fileList"))
							if(fileList && fileList.length > 0){
								for (const item of fileList) {
									if(item.type==="audio"){
										var range = editor.selection.getRng();
										var divNode = editor.getDoc().createElement('audio');
										divNode.controls="controls" 
										divNode.loop="loop" 
										divNode.preload="load"
										let href = document.location.origin + "/"+item.url;
										divNode.src =href 
										range.insertNode(divNode);
									}else{
										var range = editor.selection.getRng();
										var divNode = editor.getDoc().createElement('a');
                    divNode.className="download";
										divNode.innerText = item.name; 
										divNode.title = item.name;
										let href = document.location.origin + "/"+item.url;
										divNode.href =href 
										range.insertNode(divNode);
									}
								}
							}
							api.close();
						break;
					default:
						break;
				}
			}
		});
	};
	 
	// editor.ui.registry.getAll().icons.axupimgs || editor.ui.registry.addIcon('axupimgs','<svg viewBox="0 0 1280 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M1126.2,779.8V87.6c0-24-22.6-86.9-83.5-86.9H83.5C14.7,0.7,0,63.7,0,87.7v692c0,36.2,29.2,89.7,83.5,89.7l959.3-1.3c51.7,0,83.5-42.5,83.5-88.3zm-1044,4V86.3h961.6V783.7H82.2v0.1z" fill="#53565A"/><path d="M603,461.6L521.1,366.3,313,629.8,227.2,546.8,102.4,716.8H972.8v-170L768.2,235.2,603.1,461.6zM284.6,358.4a105.4,105.4,0,0,0,73.5-30c19.5-19.1,30.3-45,30.2-71.8,0-56.8-45.9-103-102.4-103-56.6,0-102.4,46.1-102.4,103C183.4,313.5,228,358.4,284.6,358.4z" fill="#9598A0"/><path d="M1197.7,153.6l-0.3,669.3s13.5,113.9-67.4,113.9H153.6c0,24.1,23.9,87.2,83.5,87.2h959.3c58.3,0,83.6-49.5,83.6-89.9V240.8c-0.1-41.8-44.9-87.2-82.3-87.2z" fill="#53565A"/></svg>');
	// editor.ui.registry.getAll().icons.axupimgs || editor.ui.registry.addIcon('axupimgs','<svg viewBox="0 0 1280 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><path d="M1126.2,779.8V87.6c0-24-22.6-86.9-83.5-86.9H83.5C14.7,0.7,0,63.7,0,87.7v692c0,36.2,29.2,89.7,83.5,89.7l959.3-1.3c51.7,0,83.5-42.5,83.5-88.3zm-1044,4V86.3h961.6V783.7H82.2v0.1z" fill="#53565A"/><path d="M603,461.6L521.1,366.3,313,629.8,227.2,546.8,102.4,716.8H972.8v-170L768.2,235.2,603.1,461.6zM284.6,358.4a105.4,105.4,0,0,0,73.5-30c19.5-19.1,30.3-45,30.2-71.8,0-56.8-45.9-103-102.4-103-56.6,0-102.4,46.1-102.4,103C183.4,313.5,228,358.4,284.6,358.4z" fill="#9598A0"/><path d="M1197.7,153.6l-0.3,669.3s13.5,113.9-67.4,113.9H153.6c0,24.1,23.9,87.2,83.5,87.2h959.3c58.3,0,83.6-49.5,83.6-89.9V240.8c-0.1-41.8-44.9-87.2-82.3-87.2z" fill="#53565A"/></svg>');
  editor.ui.registry.addIcon('uploadfile','<svg viewBox="0 0 300.872 300.872" xmlns="http://www.w3.org/2000/svg" width="24" height="24">	<path d="M299.916,123.326c-1.025-1.504-2.728-2.404-4.548-2.404h-46.747V81.481c0-3.039-2.465-5.504-5.504-5.504H124.84V41.59c0-3.039-2.464-5.502-5.503-5.502H5.502C2.463,36.088,0,38.551,0,41.59V259.28c0,0.201,0.012,0.398,0.033,0.594c0.004,0.039,0.012,0.074,0.017,0.113c0.022,0.168,0.05,0.336,0.087,0.504c0.013,0.055,0.028,0.107,0.042,0.162c0.039,0.148,0.083,0.297,0.134,0.443c0.019,0.055,0.039,0.109,0.059,0.162c0.059,0.152,0.124,0.301,0.196,0.447c0.021,0.041,0.039,0.084,0.061,0.125c0.097,0.186,0.203,0.367,0.322,0.543c0.002,0.002,0.002,0.004,0.004,0.004c0.007,0.012,0.016,0.02,0.023,0.031c0.108,0.156,0.226,0.305,0.349,0.447c0.043,0.051,0.088,0.1,0.133,0.148c0.096,0.103,0.195,0.203,0.298,0.299c0.051,0.047,0.101,0.094,0.153,0.139c0.119,0.103,0.242,0.201,0.369,0.293c0.037,0.025,0.072,0.055,0.109,0.08c0.17,0.117,0.347,0.225,0.529,0.322c0.023,0.012,0.047,0.022,0.069,0.033c0.16,0.082,0.323,0.156,0.491,0.223c0.05,0.02,0.101,0.037,0.151,0.057c0.145,0.053,0.292,0.098,0.441,0.139c0.059,0.016,0.116,0.031,0.176,0.045c0.15,0.035,0.304,0.063,0.457,0.086c0.056,0.008,0.11,0.018,0.167,0.025c0.209,0.023,0.419,0.039,0.631,0.039h237.615c2.262,0,4.294-1.385,5.121-3.49l52.251-132.854C301.156,126.744,300.941,124.83,299.916,123.326z M11.006,47.094h102.828v34.387c0,3.039,2.464,5.502,5.503,5.502h118.278v33.939H57.753c-2.262,0-4.294,1.385-5.121,3.488L11.006,230.252V47.094z M239.369,253.778H13.58l47.922-121.85h181.615h44.174L239.369,253.778z"></path></svg>');
	editor.ui.registry.addButton('fileupload', {
		// text:"文件上传",
		icon: 'uploadfile',
    tooltip: pluginName,
		onAction: function() {
			openDialog();
		}
	});
	editor.ui.registry.addMenuItem('fileupload', {
		icon: '',
		text: '文件上传...',
		onAction: function() {
			openDialog();
		}
	});
});
