<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ asset('assets/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css') }}">
    <title>Laravel</title>

    <style>
        html {
            background-color: #eee;
            padding: 0;
            margin: 0;
        }

        body {
            padding: 0;
            margin: 0;
        }

        a {
            text-decoration: none;
            color: #000;
        }

        nav {
            margin: 0;
        }

        nav:hover,
        nav ul li a:hover {
            background-color: #fff
        }

        nav ul {
            display: flex;
            justify-content: center;
            list-style-type: none;
            margin: 0;
        }


        nav ul li a {
            color: #000;
        }

        nav ul li a:hover {
            text-decoration: underline;
        }

        .dropdown {
            position: relative;
            display: inline-block;
            padding: 20px 0;
        }

        .dropdown-content {
            display: none;
            position: fixed;
            top: 59px;
            left: 0;
            width: 100%;
            background-color: #fff;
            z-index: 1;
        }

        /* .dropdown:hover .dropdown-content, .dropdown:active .dropdown-content {
            display: block;
        } */
    </style>

</head>

<body class="antialiased">
    <div id="root"></div>
    <div id="root2"></div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>


    @php
    $data = $data['data'];
    $protocol = stripos($_SERVER['SERVER_PROTOCOL'],'https') === 0 ? 'https://' : 'http://';
    $domain = $protocol . $_SERVER['HTTP_HOST'];
    @endphp

    <?php
    function getLink($item)
    {
        if (isset($item['link']) || strlen($item['link']) > 0) {
            echo $item['link'];
        } else {
            echo "javascript:void(0)";
        }
    }
    ?>

    <nav class="navbar">
        <ul>
            <?php foreach ($data as $key => $item) : ?>
                <?php if ($item['active']) : ?>
                    <li class="dropdown" id="<?php echo $key . preg_replace('/\s+/', '', $item['name']) ?>">
                        <a href="<?php getLink($item['resource']) ?>" style="
                                    color: <?php echo $item['resource']['color'] ?>;
                                    padding: 0 20px;
                                    display: flex;
                                    justify-content: center;
                                ">
                            <?php if($item['resource']['icon'] != null) : ?>
                                <img 
                                    src="<?php echo strlen($item['resource']['icon']['url']) > 1 ? $item['resource']['icon']['url']: '#'  ?>" 
                                    style="margin-right: 5px; width: 20px;"
                                >
                            <?php endif; ?>
                            <?php echo $item['resource']['label'] ?>
                        </a>
                        <div class="dropdown-content">
                            <?php if (!empty($item['block'])) : ?>
                                <div class="" style="
                                            width: 100%;
                                            display: flex;
                                            flex-direction: row;
                                            justify-content: center;
                                            margin: auto;
                                            flex-wrap: wrap;
                                        ">
                                    <?php foreach ($item['block'] as $key1 => $block) : ?>
                                        <?php if (!empty($block['children'])) : ?>
                                            <?php foreach ($block['children'] as $key2 => $child) : ?>

                                                <!-- Navigation List -->
                                                <?php if (!empty($child['block']['type'] == 'navigation_list')) : ?>
                                                    <ul style="
                                                                flex-direction: column;
                                                                justify-content: flex-start;
                                                                padding-top: <?php echo $child['padding']['top'] . 'px' ?>;
                                                                padding-right: <?php echo $child['padding']['right'] . 'px' ?>;
                                                                padding-bottom: <?php echo $child['padding']['bottom'] . 'px' ?>;
                                                                padding-left: <?php echo $child['padding']['left'] . 'px' ?>;
                                                                background: <?php echo $child['backgroundColor'] ?>;
                                                            ">
                                                        <li style="font-weight: 600;"><?php echo $child['block']['label'] ?></li>
                                                        <?php foreach ($child['block']['resource'] as $key3 => $resource) : ?>
                                                            <li>
                                                                <a href="<?php getLink($resource) ?>" style="
                                                                                color: <?php echo $resource['color'] ?>
                                                                            ">
                                                                    <?php echo $resource['label'] ?>
                                                                </a>

                                                            </li>
                                                        <?php endforeach; ?>
                                                    </ul>
                                                <?php endif; ?>

                                                <!-- Grid -->
                                                <?php if (!empty($child['block']['type'] == 'grid')) : ?>
                                                    <div class="" style="
                                                                display: grid;
                                                                grid-template-columns: repeat(<?php echo $child['block']['columnNo'] ?>, 1fr); 
                                                                gap: <?php echo $child['block']['gridSpacing'] . 'px' ?>;
                                                                background: <?php echo $child['backgroundColor'] ?>;
                                                            ">
                                                        <?php foreach ($child['block']['resource'] as $key3 => $resource) : ?>

                                                            <?php if ($resource['type'] == 'video') : ?>
                                                                <a href="<?php echo ($resource['link'] != null) ? $resource['link'] : '#' ?>">
                                                                    <video width="100%" height="100%" autoplay="autoplay" muted loop>
                                                                        <source src="<?php echo $domain . '/' . $resource['href']; ?>" type="video/mp4" />
                                                                    </video>
                                                                </a>
                                                            <?php else : ?>
                                                                <a href="<?php echo ($resource['link'] != null) ? $resource['link'] : '#' ?>">
                                                                    <img src="<?php echo  $domain . '/' .  $resource['href']; ?>" style="width: 100%" />
                                                                </a>
                                                            <?php endif; ?>
                                                        <?php endforeach; ?>
                                                    </div>

                                                <?php endif; ?>

                                                <!-- Block -->
                                                <?php if (!empty($child['block']['type'] == 'block')) : ?>
                                                    <div class="" style="
                                                                display: block;
                                                                width: <?php echo ($child['col']['value'] != 0) ? $child['col']['value'] . $child['col']['type'] : $child['col']['type'] ?>;
                                                                padding-top: <?php echo $child['padding']['top'] . 'px'  ?>;
                                                                padding-right: <?php echo $child['padding']['right'] . 'px'  ?>;
                                                                padding-bottom: <?php echo $child['padding']['bottom'] . 'px'  ?>;
                                                                padding-left: <?php echo $child['padding']['left'] . 'px'  ?>;
                                                            ">
                                                        <?php if ($child['block']['resource']['type'] == 'video') : ?>
                                                            <a href="<?php echo ($child['block']['resource']['link'] != null) ? $child['block']['resource']['link'] : '#' ?>">
                                                                <video width="100%" height="100%" autoplay="autoplay" muted loop>
                                                                    <source src="<?php echo $domain . '/' . $child['block']['resource']['href']; ?>" type="video/mp4" />
                                                                </video>
                                                            </a>
                                                        <?php else : ?>
                                                            <a href="<?php echo ($child['block']['resource']['link'] != null) ? $child['block']['resource']['link'] : '#' ?>">
                                                                <img src="<?php echo  $domain . '/' .  $child['block']['resource']['href']; ?>" style="width: 100%" />
                                                            </a>
                                                        <?php endif; ?>
                                                    </div>
                                                <?php endif; ?>

                                            <?php endforeach; ?>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                            <?php if ($item['show_all_button']) : ?>
                                <div class="" style="
                                            display: flex;
                                            justify-content: center;
                                            margin: 20px 0;
                                        ">
                                    <a href="<?php echo $item['resource']['link'] ?>" style="
                                                text-decoration: underline
                                            ">
                                        Shop All
                                    </a>
                                </div>
                            <?php endif; ?>
                        </div>
                    </li>

                    <script>
                        $(document).ready(function() {
                            $("#<?php echo $key . preg_replace('/\s+/', '', $item['name']) ?>").hover(function() {
                                    $('#<?php echo $key . preg_replace('/\s+/', '', $item['name']) ?> .dropdown-content')
                                        .css("display", "block");
                                }

                                ,
                                function() {
                                    $('#<?php echo $key . preg_replace('/\s+/', '', $item['name']) ?>  .dropdown-content').css("display", "none");
                                }
                            );


                            $("#<?php echo $key . preg_replace('/\s+/', '', $item['name']) ?> .dropdown-content").hover(function() {
                                    $("#<?php echo $key . preg_replace('/\s+/', '', $item['name']) ?> .dropdown-content")
                                        .css("display", "block");
                                }

                                ,
                                function() {
                                    $("#<?php echo $key . preg_replace('/\s+/', '', $item['name']) ?> .dropdown-content").css("display", "none");
                                }
                            );


                        });
                    </script>
                <?php endif; ?>
            <?php endforeach; ?>
        </ul>
    </nav>

</body>

</html>