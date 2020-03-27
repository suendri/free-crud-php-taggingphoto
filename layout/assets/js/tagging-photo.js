/* 
 * PluginName: Tagging Photo
 * Description: Tag photos with point and show tooltip
 * Version": 1.0
 * Author: Tatwerat
 * Author Link: http://www.tatwerat.com
 */

(function ($) {

    var taggingPhoto = window.taggingPhoto = {
        options: {
            allow_add_tags: false,
            show_on_hover: false,
            show_tags_list: false,
            tooltip_position: 'up',
            point_color: '#ffffff',
            onAddTag: function (points) {}
        },
        img: {
            width: 0,
            height: 0
        },
        array_search: function (key, value, myArray) {
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i][key] === value) {
                    return myArray[i];
                }
            }
        },
        array_update: function (key, value, new_value, myArray) {
            for (var i in myArray) {
                if (myArray[i][key] == value) {
                    myArray[i][key] = new_value;
                    break;
                }
            }

        },
        taggingContainer: null,
        init: function (element, options) {
            const $this = this;
            let $options = $.extend(this.options, options);
            if (!element.length)
                return false;
            element.each(function () {
                let points = ($(this).data('points')) ? JSON.stringify($(this).data('points')) : '[]';
                $this.img = {
                    width: $(this).width(),
                    height: $(this).height()
                };
                $(this).before(`<div class="photo-tagging" data-points='${points}'></div>`);
                $this.taggingContainer = $(this).prev('.photo-tagging');
                $this.taggingContainer.width($this.img.width);
                $this.taggingContainer.height($this.img.height);
                $this.taggingContainer.attr('data-points-color', $(this).data('points-color'));
                $this.taggingContainer.attr('data-allow-add-tags', $(this).data('allow-add-tags'));
                $this.taggingContainer.attr('data-show-tags-buttons', $(this).data('show-tags-buttons'));
                $this.taggingContainer.attr('data-show-all-on-hover', $(this).data('show-all-on-hover'));
                $this.taggingContainer.attr('data-points-tooltip-follow', ($(this).data('points-tooltip-follow')) ? $(this).data('points-tooltip-follow') : 'up');
                $(this).prependTo($this.taggingContainer);
                $(this).removeAttr('data-points data-points-color data-allow-add-tags data-show-tags-buttons data-points-tooltip-follow data-show-all-on-hover');
                $this.taggingContainer = $('.photo-tagging');
            });
            this.taggingContainer.each(function () {
                let taggingContainer = $(this);
                let points = ($(this).data('points')) ? $(this).data('points') : [];
                if (taggingContainer.data('show-tags-buttons') && taggingContainer.data('show-tags-buttons') === true) {
                    taggingContainer.after(`<div class="photo-tagging-list"></div>`);
                }
                if (taggingContainer.data('allow-add-tags') && taggingContainer.data('allow-add-tags') === true) {
                    taggingContainer.addClass('allow-add-tags');
                }
                $(this).click(function (e) {
                    if (taggingContainer.data('allow-add-tags') && taggingContainer.data('allow-add-tags') === true) {
                        var relX = e.pageX - $(this).parent().offset().left;
                        var relY = e.pageY - $(this).parent().offset().top;
                        var tag = prompt("Enter tag name", "Tag Name");
                        if (tag && tag != null && $.trim(tag)) {
                            $(this).append(`
                                <span data-tagging-point-color="${$options.point_color}" class="photo-tagging-point" flow="${taggingContainer.data('points-tooltip-follow')}" style="position:absolute;top:${relY}px;left:${relX}px;" tooltip="${tag}"><i></i></span>
                            `);
                            points.push({
                                top: relY,
                                left: relX,
                                text: tag
                            });
                            $(this).attr('data-points', JSON.stringify(points));
                            $options.onAddTag(points);
                            $this.update(taggingContainer, points);
                        }
                    }
                }).on('click', 'span.photo-tagging-point', function (e) {
                    e.stopPropagation();
                });
                if (taggingContainer.data('show-all-on-hover') && taggingContainer.data('show-all-on-hover') === true) {
                    $(this).hover(function (e) {
                        $('.photo-tagging-point', this).addClass('show-tooltip');
                    }, function () {
                        $('.photo-tagging-point', this).removeClass('show-tooltip');
                    });
                }
                $this.update(taggingContainer, points);
                taggingContainer.next('.photo-tagging-list').each(function () {
                    $(this).on('click', '.photo-tagging-tag-text', function () {
                        if (taggingContainer.data('allow-add-tags') && taggingContainer.data('allow-add-tags') === true) {
                            var item = $this.array_search('text', $(this).text(), points)
                            var tag = prompt("Update tag name", $(this).text());
                            if (tag && tag != null && $.trim(tag)) {
                                $this.array_update('text', $(this).text(), tag, points);
                                $this.update(taggingContainer, points);
                                $options.onAddTag(points);
                            }
                        }
                    });
                    $(this).on('mouseover', '.photo-tagging-tag-text', function () {
                        $('span[tooltip="' + $(this).text() + '"]', taggingContainer).addClass('show-tooltip');
                    });
                    $(this).on('mouseout', '.photo-tagging-tag-text', function () {
                        $('span', taggingContainer).removeClass('show-tooltip');
                    });
                    $(this).on('click', '.photo-tagging-tag-delete', function () {
                        if (taggingContainer.data('allow-add-tags') && taggingContainer.data('allow-add-tags') === true) {
                            var text = $(this).prev('.photo-tagging-tag-text').text();
                            var item = $this.array_search('text', text, points);
                            var index = points.indexOf(item);
                            var _delete = confirm("Delete ( " + text + " )");
                            if (_delete === true) {
                                points.splice(index, 1);
                            }
                            $this.update(taggingContainer, points);
                            $options.onAddTag(points);
                        }
                    });
                });
            });
        },
        update: function (taggingContainer, points) {
            const $this = this;
            var _point = '';
            if (points && points.length >= 1) {
                taggingContainer.find('.photo-tagging-point').remove();
                $.each(points, function (index, point) {
                    _point += (`<span data-tagging-point-color="${$this.options.point_color}" class="photo-tagging-point" flow="${taggingContainer.data('points-tooltip-follow')}" style="position:absolute;top:${point.top}px;left:${point.left}px;" tooltip="${point.text}"><i></i></span>`);
                });
                taggingContainer.append(_point);
                var button = '';
                if (taggingContainer.data('show-tags-buttons') && taggingContainer.data('show-tags-buttons') === true) {
                    $.each(points, function (index, point) {
                        var delete_button = '';
                        if (taggingContainer.data('allow-add-tags') && taggingContainer.data('allow-add-tags') === true)
                            delete_button = `<span class="photo-tagging-tag-delete"><i class="tp-icon-close"></i></span>`;
                        button += (`
                                    <a>
                                        <span class="photo-tagging-tag-text">${point.text}</span>
                                        ${delete_button}
                                    </a>
                                  `);
                    });
                    taggingContainer.next('.photo-tagging-list').empty().html(button);
                }
            } else {
                taggingContainer.find('.photo-tagging-point').remove();
                taggingContainer.next('.photo-tagging-list').empty();
            }
        }


    };


})(jQuery);


