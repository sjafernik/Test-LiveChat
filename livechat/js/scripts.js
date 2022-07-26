jQuery.getUrlParam = function(strParamName)
{
	var strReturn = null;
	var strHref = window.location.href;
	var param = null;
	strHref = strHref.replace(/#(.*)/, '');

	if (strHref.indexOf('?') > -1)
	{
		var strQueryString = strHref.substr(strHref.indexOf('?'));
		var aQueryString = strQueryString.split('&');
		for (var iParam = 0; iParam < aQueryString.length; iParam++)
		{
			param = aQueryString[iParam].replace(/^\?/, '');
			if (param.indexOf(strParamName + '=') === 0)
			{
				var aParam = param.split('=');
				strReturn = aParam[1];
				break;
			}
		}
	}

	if (strReturn === null) return null;

	return decodeURIComponent(strReturn);
};

var Preview =
{	
	init: function()
	{
		var matches, license, skill, iframe, input, param,
		    loc = document.location.toString();

		// get license number from url
		matches = loc.match(/(preview|licence)\/(\d+)(\/(\d+)*)?/);
		if (matches == null)
		{
			// license number not provided in the URL
			return false;
		}
		else
		{
			license = parseInt(matches[2], 10);
			if (matches[4] != null)
			{
				skill = parseInt(matches[4], 10);
			}
		}

		// get group number from url (if exists)
		if (skill == null)
		{
			skill = 0;
			matches = loc.match(/skill=(\d+)/);
			if (matches != null)
			{
				skill = parseInt(matches[1], 10);
			}
		}

		window.LC_API = window.LC_API || {};
		LC_API.on_before_load = function()
		{
			var windowPosition, chatWindowType;

 			windowPosition = $('#livechat-compact-container').css('left');
			if (windowPosition != 'auto')
			{
				$('.indicator-down').hide();
			}

			chatWindowType = LC_API.get_window_type();
			if (chatWindowType === 'embedded')
			{
				$('.indicator-down').fadeIn('slow').animate({ bottom: 75 }, {duration: 1000, easing: 'easeInCubic'});
			}
			else if (chatWindowType === 'popup')
			{
				//$('em.windowType').text("button");
				$('#button-container').show();
			}
		}

		LC_API.on_chat_window_opened = function()
		{
			$('.indicator-down').hide();
		}

		$('#teaser h1 a').click(function(e)
		{
			e.preventDefault();
			$('#teaser .previewSampleWebsite').fadeOut('fast', function()
			{
				$('#teaser .previewOwnWebsite').fadeIn();
				$('#teaser h1 input').focus().select();
			});
		});

		iframe = $('#customWebpage');
		input = $('#loadcustomWebpagePreview input.text');
		param = $.getUrlParam('page');

		var showPreview = function(page) {
			if (page && !page.match(/^http([s]?):\/\/.*/))
			{
				page = "http://" + page;
			}
			input.val(page);

			$('#content').fadeOut('fast');
			$('body').css('overflow', 'hidden').css('height', '100%');
			$(iframe).fadeIn().attr('src', page);
			$('button.goBack').fadeIn();
		}

		if(param) {
			showPreview(param);
		}

		$('#loadcustomWebpagePreview').submit(function()
		{
			var val = input.val();
			showPreview(val);
			return false;
		});

		$('button.goBack').click(function()
		{
			$(iframe).fadeOut(function()
			{
				$('#content').fadeIn(function(){$('#teaser h1 input').focus().select()});
			});

			$('button.goBack').fadeOut();
			$('body').css('overflow', 'visible');
		});

		// finally, inject LiveChat tracking code to display the chat window / chat button
		window.__lc = {};
		//window.__lc.hostname = 'secure-cf.livechatinc.com';
		//window.__lc.chat_absolute_url = 'http://cdn.livechatinc.com/preview/chat.html';
		window.__lc.license = license;
		window.__lc.skill = skill;
		window.__lc.test = 1;

		(function() {
			var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
			lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
		})();
	}
};

$(document).ready(function()
{
	Preview.init();
});
