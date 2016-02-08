function trimByPixel(textObject, parentObject) {
    var parentWidth = $(parentObject).width() - 5;
    var textWidth = $(textObject).width();
    var text = $(textObject).text();

    while (textWidth >= parentWidth)
    {
        text = text.substring(0, text.length - 1);
        $(textObject).text(text + '...');
        textWidth = $(textObject).width();
    }
    initTooltip();
}

function trimNames()
{
    setTimeout(function ()
    {
        $('.streamname').each(function ()
        {
            trimByPixel(this, $('.channel'));
        });
    }, 500);
}

function initTooltip()
{
    $('.streamname').tooltip({delay: 50});
}