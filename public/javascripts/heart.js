var fake = '#fake-heart';
var real = '#real-heart';
var leftX = '#left-x';
var rightX = '#right-x';
var text = '#text';
var leftText = '#text > #left';
var rightText = '#text > #right';

var scale = 0;

function parallax(event)
{
	var body = document.body;
	var scrollTop = body.scrollTop;


	if (scrollTop < 220) //x is coming
	{
		scale = scrollTop / 200;

		if (scale > 1)
		{
			scale = 1;
		}

		qs(leftX).transform = 'rotate(45deg) scale(' + scale + ')';
		qs(rightX).transform = 'rotate(-45deg) scale(' + scale + ')';
	}
	else if (scrollTop >= 220 && scrollTop < 480) //'Hülyeség' text showing
	{
		scale = (scrollTop - 220) / 250;

		if (scale > 1)
		{
			scale = 1;
		}

		qs(text).transform = 'scale(' + scale + ')';

		qs(fake).opacity = 1;
        qs(fake).top = '8px';

	}
	else if (scrollTop >= 480 && scrollTop < 780) //x is hiding and fake go to bottom
	{
		//x is hiding
		scale = 1 - ((scrollTop - 480) / 200);

		if (scale < 0)
		{
			scale = 0;
		}

        qs(leftX).transform = 'rotate(45deg) scale(' + scale + ')';
        qs(rightX).transform = 'rotate(-45deg) scale(' + scale + ')';


        //fake go to bottom
		var top = scrollTop - 480;
		var opacity = 1 - ((scrollTop - 480) / 300 );

		qs(fake).top = top + 'px';
		qs(fake).opacity = opacity;

		qs(leftText).opacity = qs(rightText).opacity = 0;
	}
	else if (scrollTop >= 780 && scrollTop < 1200)
	{
		var top = scrollTop - (780 + 300);


		if (top > 8)
		{
			top = 8;
		}

		qs(real).top = top + 'px';
        qs(real).transform = 'scale(1)';

        qs(fake).opacity = 0;
	}
	else if (scrollTop >= 1200)
	{
		var rhythm = scrollTop - 1200;
		var rhythmPerHundred = rhythm / 100;

        var scale = 1;

        if (rhythm < 100)
		{
            qs(real).transform = 'scale(1)';
		}
		if (rhythm >= 100 && rhythm < 200)
		{
			scale = rhythmPerHundred;

			qs(real).transform = 'scale(' + scale + ')';
		}
		else if (rhythm >= 200 && rhythm < 300)
		{
			scale = 3 - (rhythmPerHundred - 1);

            qs(real).transform = 'scale(' + scale + ')';
			qs(leftText).opacity = 1;
		}
        else if (rhythm >= 300 && rhythm < 400)
		{
            qs(real).transform = 'scale(1)';
		}
		else if (rhythm >= 500 && rhythm < 600)
		{
            scale = rhythmPerHundred - 4;

            qs(real).transform = 'scale(' + scale + ')';
		}
		else if (rhythm >= 600 && rhythm < 700)
		{
            scale = 8 - (rhythmPerHundred);

            qs(real).transform = 'scale(' + scale + ')';
            qs(leftText).opacity = qs(rightText).opacity = 1;
		}
		else if (rhythm >= 700 && rhythm < 1200)
		{
			var opacity = 1 - ((rhythm - 700) / 100 - 2);

			qs(leftText).opacity = qs(rightText).opacity = opacity;
            qs(real).transform = 'scale(1)';
		}
		else if (rhythm > 1200)
		{
			document.body.scrollTop = 1200;
		}
	}




	if (scrollTop >= 180 && scrollTop <= 760)
	{
		q(leftText).innerText = 'Hülyeség';
        q(rightText).innerText = '';
	}
	else if (scrollTop >= 760 && scrollTop < 1200)
	{
		q(leftText).innerText = q(rightText).innerText = '';
	}
	else if (scrollTop >= 1200)
	{
		q(leftText).innerText = q(rightText).innerText = 'dob';
	}
}

/**
 * @param {string} selector
 * @return {Element}
 */
function q(selector)
{
	return document.querySelector(selector);
}

/**
 * @param {string} selector
 * @return {CSSStyleDeclaration}
 */
function qs(selector)
{
	return q(selector).style;
}