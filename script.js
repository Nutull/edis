 // 1. ИЗМЕНЕННАЯ ФУНКЦИЯ ПРОКРУТКИ ДЛЯ ССЫЛОК НА СТРАНИЦЕ
    function slowScrool(id)
    {
        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 500);
    }

    // 2. ФУНКЦИЯ ДЛЯ КНОПКИ "НАВЕРХ"
    function scrollToTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
    }
    
    // 3. ФУНКЦИЯ ДЛЯ АНИМАЦИИ ПОЯВЛЕНИЯ БЛОКОВ
    function checkVisibility() {
        var windowTop = $(window).scrollTop();
        var windowBottom = windowTop + $(window).height();

        // Анимируем основные блоки (с классом fade-in)
        $('.fade-in:not(.revealed)').each(function() {
            var elementTop = $(this).offset().top;
            
            // Если верхняя граница элемента находится в пределах 95% от нижней границы окна:
            if (elementTop < windowBottom * 0.95) { 
                $(this).addClass('revealed');
            }
        });
        
        // Анимируем карточки преимуществ (.benefit-item) с последовательной задержкой
        $('.benefit-item:not(.revealed)').each(function(index) {
            var elementTop = $(this).offset().top;
            var delay = index * 100; 

            if (elementTop < windowBottom * 0.95) {
                var $element = $(this);
                setTimeout(function() {
                    $element.addClass('revealed');
                }, delay);
            }
        });
    }

    // 4. ОБРАБОТЧИК ПРОКРУТКИ (ЕГО ЛОГИКА ОСТАЕТСЯ БЕЗ ИЗМЕНЕНИЙ)
    $(document).on("scroll", function()
    {
        var scrollPos = $(window).scrollTop();
        
        // Логика фиксированного хедера
        if(scrollPos === 0) {
            $("header").removeClass("fixed");
        } else {
            // Используем addClass, чтобы избежать перезаписи других классов
            $("header").addClass("fixed"); 
        }
        
        // Логика стрелки "Наверх"
        if (scrollPos > 300) {
            $("#scroll-to-top").fadeIn();
        } else {
            $("#scroll-to-top").fadeOut();
        }
        
        // Проверяем видимость блоков при прокрутке
        checkVisibility();
    });

    // 5. ИНИЦИАЛИЗАЦИЯ (ИСПРАВЛЕННАЯ ЛОГИКА)
    $(document).ready(function() {
        
        // **АГРЕССИВНЫЙ СБРОС 1: СРАЗУ ПОСЛЕ ЗАГРУЗКИ DOM**
        // С небольшой задержкой, чтобы дать браузеру мгновенно стабилизироваться
        setTimeout(function() {
            $('html, body').scrollTop(0);
        }, 10);
        
        // Назначаем функции
        $("#scroll-to-top").click(scrollToTop);

        $("#logo").off('click').on('click', function() {
            window.location.href = '/'; 
        });

        // Проверяем видимость блоков при загрузке страницы (можно оставить)
        checkVisibility(); 
    });

    // **АГРЕССИВНЫЙ СБРОС 2: ПОСЛЕ ПОЛНОЙ ЗАГРУЗКИ ВСЕХ РЕСУРСОВ (Картинки, шрифты и т.д.)**
    // Это окончательно гарантирует, что позиция будет 0, даже если что-то "сдвинуло" ее.
    $(window).on('load', function() {
        $('html, body').scrollTop(0);
        // Дополнительная проверка анимации после окончательной прокрутки
        checkVisibility(); 
    });

