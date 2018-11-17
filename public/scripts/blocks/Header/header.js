function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!('undefined'==typeof window&&e||t))throw n.message+=' on line '+r,n;try{t=t||require('fs').readFileSync(e,'utf8');}catch(e){pug_rethrow(n,null,r);}var i=3,a=t.split('\n'),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?'  > ':'    ')+t+'| '+n;}).join('\n');throw n.path=e,n.message=(e||'Pug')+':'+r+'\n'+i+'\n\n'+n.message,n;}function header(locals) {var pug_html = '', pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {'header.pug':'case headerType\n    when "notLoggedIn"\n        a(class="navigation__basicButton basicButton_back" ) Назад\n        a(class="navigation__basicButton" href="signup" data-href="signup") Регистрация\n        a(class="navigation__basicButton" href="signin" data-href="signin") Вход\n    when "loggedIn"\n        a(class="navigation__basicButton basicButton_back") Назад\n        a(class="navigation__basicButton" href="logout" data-href="logout") Выйти\n        a(class="navigation__basicButton" href="profile" data-href="profile") Профиль\n        '};
	var locals_for_with = (locals || {});(function (headerType) {pug_debug_line = 1;pug_debug_filename = 'header.pug';
		switch (headerType){
		case 'notLoggedIn':
			pug_debug_line = 3;pug_debug_filename = 'header.pug';
			pug_html = pug_html + '\u003Ca class="navigation__basicButton basicButton_back"\u003E';
			pug_debug_line = 3;pug_debug_filename = 'header.pug';
			pug_html = pug_html + 'Назад\u003C\u002Fa\u003E';
			pug_debug_line = 4;pug_debug_filename = 'header.pug';
			pug_html = pug_html + '\u003Ca class="navigation__basicButton" href="signup" data-href="signup"\u003E';
			pug_debug_line = 4;pug_debug_filename = 'header.pug';
			pug_html = pug_html + 'Регистрация\u003C\u002Fa\u003E';
			pug_debug_line = 5;pug_debug_filename = 'header.pug';
			pug_html = pug_html + '\u003Ca class="navigation__basicButton" href="signin" data-href="signin"\u003E';
			pug_debug_line = 5;pug_debug_filename = 'header.pug';
			pug_html = pug_html + 'Вход\u003C\u002Fa\u003E';
			break;
		case 'loggedIn':
			pug_debug_line = 7;pug_debug_filename = 'header.pug';
			pug_html = pug_html + '\u003Ca class="navigation__basicButton basicButton_back"\u003E';
			pug_debug_line = 7;pug_debug_filename = 'header.pug';
			pug_html = pug_html + 'Назад\u003C\u002Fa\u003E';
			pug_debug_line = 8;pug_debug_filename = 'header.pug';
			pug_html = pug_html + '\u003Ca class="navigation__basicButton" href="logout" data-href="logout"\u003E';
			pug_debug_line = 8;pug_debug_filename = 'header.pug';
			pug_html = pug_html + 'Выйти\u003C\u002Fa\u003E';
			pug_debug_line = 9;pug_debug_filename = 'header.pug';
			pug_html = pug_html + '\u003Ca class="navigation__basicButton" href="profile" data-href="profile"\u003E';
			pug_debug_line = 9;pug_debug_filename = 'header.pug';
			pug_html = pug_html + 'Профиль\u003C\u002Fa\u003E';
			break;
		}}.call(this,'headerType' in locals_for_with?locals_for_with.headerType:typeof headerType!=='undefined'?headerType:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);}return pug_html;}