<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="{{ asset('assets/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css') }}">
    <title>Laravel</title>

    <style>
        body {
            margin: 0;
            padding: 0;
        } 
        .grid-container {
            display: grid;
        }

        .grid-item {
            background-color: rgba(255, 255, 255, 0.8);
            border: 1px solid rgba(0, 0, 0, 0.8);
            padding: 20px;
            font-size: 30px;
            text-align: center;
        }

        /* Custom Css */
        .owl-prev {
            position: absolute;
            top: 40%;
            left: 10px;
            display: block !important;
            border:0px solid black;
        }
        .owl-next {
            position: absolute;
            top: 40%;
            right: 20px;
            display: block !important;
            border:0px solid black;
        }
        .owl-prev:hover ,.owl-next:hover {
            background: transparent !important;
        }
        .owl-prev span ,.owl-next span {
            font-size: 20px;
            color: #000;
            background-color: #fff;
            padding: 13px 20px;
            border-radius: 50%;
        }
        .owl-prev i, .owl-next i {transform : scale(1,6); color: #ccc;}
        .owl-dots {
            display: block;
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translate(-50%, -50%);
        }

    </style>

</head>

    <body class="antialiased">
        <div id="root"></div>
        <div id="root2"></div>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="{{ asset('assets/OwlCarousel2-2.3.4/dist/owl.carousel.min.js') }}"></script>


        @php
        $data = $data['data'];
        $protocol = stripos($_SERVER['SERVER_PROTOCOL'],'https') === 0 ? 'https://' : 'http://';
        $domain = $protocol . $_SERVER['HTTP_HOST'];
        @endphp

        <div style="width: 100%;">
            <?php

            for ($x = 0; $x < count($data); $x++) {

                $parent = $data[$x];

                $height = is_numeric($parent['height']) ? $parent['height'] . 'px' : $parent['height'];
                $backgroundColor = $parent['backgroundColor'];

                $padding = $parent['padding']['top'] . 'px ' . $parent['padding']['right'] . 'px ' . $parent['padding']['bottom'] . 'px ' . $parent['padding']['left'] . 'px';

                $flex = $parent['flex'];


                $children = $parent['children'];
            ?>

                <div 
                    class="inertia-menu-parent" 
                    style="
                    display:flex; 
                    height:<?php echo $height; ?>;
                    background-color:<?php echo $backgroundColor; ?>;
                    padding:<?php echo $padding; ?>;
                    flex-direction:<?php echo $flex['direction']; ?>;
                    flex-wrap:<?php echo $flex['wrap']; ?>;
                    justify-content:<?php echo $flex['justifyContent']; ?>;
                    "
                >
                    <?php
                    for ($y = 0; $y < count($children); $y++) {
                        $child = $children[$y];

                        $child_width = '';
                        if ($child['col']['type'] == 'px' || $child['col']['type'] == '%') {
                            $child_width = "width: " . $child['col']['value'] . $child['col']['type'] . ";";
                        } else if ($child['col']['type'] == 'flexGrow') {
                            $child_width = "flex-grow: " . $child['col']['value'];
                        } else if ($child['col']['type'] == 'auto') {
                            $child_width = "width: auto;";
                        }

                        $child_backgroundColor = $child['backgroundColor'];
                        $child_padding = $child['padding']['top'] . 'px ' . $child['padding']['right'] . 'px ' . $child['padding']['bottom'] . 'px ' . $child['padding']['left'] . 'px';

                        $block = $child['block'];
                    ?>
                        <div 
                            class="inertia-menu-child" 
                            style="
                                width:100%;
                                display:flex; 
                                background-color:<?php echo $child_backgroundColor; ?>;
                                padding:<?php echo $child_padding; ?>;
                            "
                        >

                            <!-- Block -->
                            <?php if ($block['type'] == 'block'): ?>
                                <?php $resource = $block['resource']; ?>
                                <div class="inertia-menu-block" style="width:100%;">
                                    <?php if ($resource['type'] == 'video'): ?>
                                        <a href="<?php echo ($resource['link'] != null) ? $resource['link'] : 'javascript:void(0)' ?>">
                                            <video width="100%" height="100%" autoplay="autoplay" muted loop>
                                                <source src="<?php echo $domain . '/' . $resource['href']; ?>" type="video/mp4" />
                                            </video>
                                        </a>
                                    <?php else: ?>
                                        <a href="<?php echo ($resource['link'] != null) ? $resource['link'] : 'javascript:void(0)' ?>">
                                            <img src="<?php echo $domain . '/' . $resource['href']; ?>" style="width: 100%" />
                                        </a>
                                    <?php endif; ?>
                                </div>
                            <?php endif; ?>

                            <!-- Grid -->
                            <?php if ($block['type'] == 'grid'): ?>
                                <?php 
                                    $resources = $block['resource']; 
                                    $columNo = $block['columnNo'] ? "grid-template-columns: repeat(" . $block['columnNo'] . ", minmax(0px, 1fr));" : '';
                                    $gridSpacing = $block['gridSpacing'] ? 'gap:' . $block['gridSpacing'] . 'px;' : '';
                                ?>
                                <div 
                                    class="grid-container" 
                                    style="
                                        width: 100%;
                                        <?php echo $columNo; ?> 
                                        <?php echo $gridSpacing; ?>
                                    "
                                >
                                <?php
                                    foreach ($resources as $key => $resource):
                                    ?>

                                        <div class="inertia-menu-block" style="width:100%;">
                                            <?php if ($resource['type'] == 'video'): ?>
                                                <a href="<?php echo ($resource['link'] != null) ? $resource['link'] : 'javascript:void(0)' ?>">
                                                    <video width="100%" height="100%" autoplay="autoplay" muted loop>
                                                        <source src="<?php echo $domain . '/' . $resource['href']; ?>" type="video/mp4" />
                                                    </video>
                                                </a>
                                            <?php else: ?>
                                                <a href="<?php echo ($resource['link'] != null) ? $resource['link'] : 'javascript:void(0)' ?>">
                                                    <img src="<?php echo $domain . '/' . $resource['href']; ?>" style="width: 100%" />
                                                </a>
                                            <?php endif; ?>
                                        </div>

                                    <?php
                                    endforeach;
                                ?>
                            
                                </div>



                                
                            <?php endif; ?>

                            <!-- Carousel -->
                            <?php if ($block['type'] == 'carousel'): ?>
                                <?php $resource = $block['resource']; ?>
                                <?php if(strlen($block['label'] > 0)) : ?>
                                    <span 
                                        style="
                                            text-align: <?php echo $block['labelAlign'] ?>; 
                                            width: 100%;
                                            font-size: <?php echo $block['labelFontSize'] . 'px' ?>;
                                        ">
                                            <?php echo $block['label'] ?>
                                        </>
                                <?php endif; ?>
                                <div class="owl-carousel owl-theme owl-loaded" id="<?php echo $y . $block['type'] ?>">
                                    <?php foreach ($resource as $key => $item): ?>
                                        <?php if($item['type'] == 'video') : ?>
                                            <a href="<?php echo ($item['link'] != null) ? $item['link'] : 'javascript:void(0)' ?>">
                                                <video width="100%" height="100%" autoplay="autoplay" muted loop>
                                                    <source src="<?php echo $domain . '/' . $item['href']; ?>" type="video/mp4" />
                                                </video>
                                                <?php if(strlen($item['label'] > 0)) : ?>
                                                    <span 
                                                        style="
                                                            display: block;
                                                            color: #000;
                                                            text-align: <?php echo $block['slideLabelAlign'] ?>;
                                                            font-size: <?php echo $item['labelFontSize']. 'px' ?>
                                                        "
                                                    >
                                                        <?php echo $item['label'] ?>
                                                    </span>
                                                <?php endif; ?>
                                            </a>
                                        <?php else: ?>
                                            <a href="<?php echo ($item['link'] != null) ? $item['link'] : 'javascript:void(0)' ?>" style="text-decoration: none">
                                                <img src="<?php echo  $domain . '/' .  $item['href']; ?>"  style="width: 100%" />
                                                <?php if(strlen($item['label'] > 0)) : ?>
                                                    <span 
                                                        style="
                                                            display: block;
                                                            color: #000;
                                                            text-align: <?php echo $block['slideLabelAlign'] ?>;
                                                            font-size: <?php echo $item['labelFontSize']. 'px' ?>
                                                        "
                                                    >
                                                        <?php echo $item['label'] ?>
                                                    </span>
                                                <?php endif; ?>
                                            </a>
                                            
                                        <?php endif; ?>
                                        
                                    <?php endforeach; ?>
                                </div>
                                <script>
                                    $(document).ready(function() {
                                        $("#<?php echo $y . $block['type'] ?>").owlCarousel({
                                            loop: <?php echo $block['loop'] ? 'true' : 'false' ?>,
                                            nav: <?php echo $block['withControls'] ? 'true' : 'false' ?>,
                                            dots: <?php echo $block['withIndicators'] ? 'true' : 'false'  ?>,
                                            responsive:{
                                                0:{
                                                    items:1
                                                },
                                                600:{
                                                    items:1
                                                },
                                                1000:{
                                                    items:1
                                                }
                                            }
                                        });
                                    });
                                </script>

                            <?php endif; ?>

                            <!-- Slider -->
                            <?php if ($block['type'] == 'slider'): ?>
                                <?php $resource = $block['resource']; ?>
                                <div class="owl-carousel owl-theme owl-loaded" id="<?php echo $y . $block['type'] ?>">
                                    <?php foreach ($resource as $key => $item): ?>
                                        <?php if($item['type'] == 'video') : ?>
                                            <a href="<?php echo ($item['link'] != null) ? $item['link'] : 'javascript:void(0)' ?>">
                                                <video width="<?php echo $item['slideSize'].'%' ?>" height="100%" autoplay="autoplay" muted loop>
                                                    <source src="<?php echo $domain . '/' . $item['href']; ?>" type="video/mp4" />
                                                </video>
                                            </a>
                                        <?php else: ?>
                                            <a href="<?php echo ($item['link'] != null) ? $item['link'] : 'javascript:void(0)' ?>">
                                                <img src="<?php echo $domain . '/' . $item['href']; ?>" style="width: 100%" />
                                            </a>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </div>
                                <script>
                                    $(document).ready(function() {
                                        $("#<?php echo $y . $block['type'] ?>").owlCarousel({
                                            loop: <?php echo $block['loop'] ? 'true' : 'false' ?>,
                                            nav: <?php echo $block['withControls'] ? 'true' : 'false' ?>,
                                            dots: <?php echo $block['withIndicators'] ? 'true' : 'false'  ?>,
                                            // freeDrag: <?php echo $block['draggable'] ? 'true' : 'false'  ?>, // this feature doesn't work
                                        });
                                    });
                                </script>

                            <?php endif; ?>

                            <!-- Text -->
                            <?php if ($block['type'] == 'text'):?>
                                <div 
                                    class="" 
                                    style="
                                        text-align: center;
                                        display: block;
                                        width: 100%;
                                    "
                                >   
                                    <a 
                                        href="<?php echo strlen($block['resource']['href']) > 0 ? $block['resource']['href'] : 'javascript:void(0)' ?>"
                                        style="text-decoration: none;">
                                        <span 
                                            style="
                                                font-weight: <?php echo $block['bold'] ?>;
                                                letter-spacing: <?php echo $block['letterSpacing'] .'px' ?>;
                                                font-size: <?php echo $block['size'] . 'px' ?>;
                                                font-style: <?php echo $block['italic'] ? 'italic' : 'normal' ?>;
                                                text-decoration: <?php echo $block['underline'] ? 'underline' : 'normal' ?>;
                                                color: <?php echo $block['color'] ?>
                                            "
                                        >
                                            <?php echo $block['resource']['label'] ?>
                                        </span>
                                    </a>
                                    
                                </div>
                            <?php endif; ?>
                        </div>

                    <?php
                    }
                    ?>

                </div>
            <?php
            }
            ?>
        </div>
    </body>
</html>