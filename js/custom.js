$(document).ready(function () {
    function makeRadar(id, datasets) {
        const ctx = document.getElementById(id);
        return new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Fast charge', 'Cost', 'Lifespan', 'Safety', 'Spec. energy', 'Spec. power'],
                datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        suggestedMin: 0, suggestedMax: 100,
                        angleLines: { color: '#eee' },
                        grid: { color: '#eee' },
                        pointLabels: { font: { size: 11 } },
                        ticks: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label(ctx) {
                                return ` ${ctx.dataset.label} — ${ctx.label}: ${ctx.formattedValue}/100`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Example (0–100). Adjust to your data/story.
    makeRadar('radar-lmo', [
        {
            label: 'LMO', data: [65, 75, 55, 80, 60, 70], fill: true,
            borderWidth: 2, borderColor: '#1f2937', backgroundColor: 'rgba(31,41,55,.15)'
        }
    ]);

    makeRadar('radar-nca', [
        {
            label: 'NCA', data: [70, 55, 50, 60, 88, 90], fill: true,
            borderWidth: 2, borderColor: '#111827', backgroundColor: 'rgba(17,24,39,.15)'
        }
    ]);

    makeRadar('radar-nmc', [
        {
            label: 'NMC', data: [65, 60, 65, 72, 80, 82], fill: true,
            borderWidth: 2, borderColor: '#111827', backgroundColor: 'rgba(17,24,39,.15)'
        }
    ]);

    (function () {
        function initPortfolio() {
            var $ = window.jQuery;
            var $grid = $('#work-grid');

            if (!$grid.length || !$.fn.isotope) return;

            // wait for images to avoid bad layout
            if (window.imagesLoaded) {
                imagesLoaded($grid[0], doInit);
            } else {
                doInit();
            }

            function applyFilter(val) {
                $grid.isotope({ filter: val });
                // sync active state
                $('.works-filter .filter').removeClass('active')
                    .filter('[data-filter="' + val + '"]').addClass('active');
            }

            function doInit() {
                // (re)create Isotope with your default filter
                $grid.isotope({
                    itemSelector: '.work-item',
                    layoutMode: 'fitRows',
                    filter: '.photography'
                });

                // mark as ready to release the CSS guard
                $grid.addClass('isotope-ready');

                // click handlers
                $('.works-filter .filter').off('click._iso').on('click._iso', function (e) {
                    e.preventDefault();
                    applyFilter($(this).data('filter'));
                });

                // some themes re-init/arrange later; pin it back to .photography if it drifts
                $grid.on('arrangeComplete._guard', function (e, laidOutItems) {
                    var currentFilter = $grid.data('isotope') && $grid.data('isotope').options.filter;
                    if (!currentFilter || currentFilter === '*') {
                        applyFilter('.photography');
                    }
                });

                // final guard in case theme runs late
                setTimeout(function () { applyFilter('.photography'); }, 200);
                setTimeout(function () { applyFilter('.photography'); }, 800);
            }
        }

        // Run after page fully loads (themes often init on window.load)
        if (document.readyState === 'complete') initPortfolio();
        else window.addEventListener('load', initPortfolio);

        // prevent anchor jump on the filter links
        document.addEventListener('click', function (e) {
            var a = e.target.closest('.works-filter .filter');
            if (a) e.preventDefault();
        }, true);
    })();

});