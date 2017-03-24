function ClickExplorer(element , value) {
	console.log(element);
	console.log(value);
	
	var result_elementID = 'result';
	switch(element.type) {
			case "block_hash":
					var url = 'https://bitcoin.mubiz.com/block_hash/' + value + '/';
					fonctionRequeteApi(url, result_elementID);
					break;
			case "tx":
					var url = 'https://api.blockcypher.com/v1/btc/main/txs/' + value;
					fonctionRequeteApi(url, result_elementID);
					break;
			case "addresses":
					var url = ' https://bitcoin.mubiz.com/address/' + value + '/';
					fonctionRequeteApi(url, result_elementID);
					break;
			default:
					//none
	} 
}

function getLink(data, type, innerHTML) {
	return '<a onclick="ClickExplorer(this, \''+ data.replace(/"/g, "") +'\');" value="'+ data.replace(/"/g, "") +'" type="' + type.replace(/"/g, "").replace(/:/g, "") + '" >' +  innerHTML + '</a>';
}

function syntaxHighlight(json) {
		var previousClsName = "undifined";
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
				if(cls == 'string'){
					var link = getLink(match , previousClsName ,'<span class="' + cls + '">' + match + '</span>' );
					return link;
				}
				previousClsName = match;
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function fonctionRequeteApi(url, elementID) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
					var myObj = this.responseText;
					var jsonPretty = JSON.stringify(JSON.parse(myObj),null,2);
					document.getElementById( elementID ).innerHTML = syntaxHighlight(jsonPretty);
			}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
	
function homePageLoading() {
    url = 'https://bitcoin.mubiz.com/info';
    elementID = 'info';
    fonctionRequeteApi(url, elementID);
		
    url = 'https://bitcoin.mubiz.com/blockchaininfo';
    elementID = 'blockchaininfo';
    fonctionRequeteApi(url, elementID);
		
    url = 'https://bitcoin.mubiz.com/mininginfo';
    elementID = 'mininginfo';
    fonctionRequeteApi(url, elementID);
		
    url = 'https://bitcoin.mubiz.com/peerinfo';
    elementID = 'peerinfo';
    fonctionRequeteApi(url, elementID);
}

