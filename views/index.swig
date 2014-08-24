<!DOCTYPE html>
<html>
<head>
    <!-- META -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <title>{% block title %}ProSilver - StyleGuide{% endblock %}</title>

    <!-- STYLES -->{% block styles %}
    <link rel="stylesheet" type="text/css" href="assets/css/style.css" media="all" />
    {% endblock %}
    <!-- ICONS -->
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    <!-- <link href="https://fontastic.s3.amazonaws.com/RXbnET5YNarDEPRMCf8SS7/icons.css" rel="stylesheet"> -->

    <!-- FONTS -->{% block fonts %}
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,600,300,400,700,800&subset=latin,cyrillic-ext,greek-ext,vietnamese,greek,latin-ext,cyrillic' rel='stylesheet' type='text/css'>
    {% endblock %}
    <!-- JS HEADER -->{% block header_js %}{% endblock %}
</head>
<body>
    {% block header %}{% include './partials/header.swig' %}{% endblock %}
    <div class="body">
        {% block content %}
        <div class="core">
            <div class="banner">
                <div class="container">
                    <h2 class="alpha banner-title">Core</h2>
                </div>
            </div>
            {% include './partials/core/colors.swig' %}
            {% include './partials/core/fonts.swig' %}
            {% include './partials/core/type.swig' %}
            {% include './partials/core/lists.swig' %}
            {% include './partials/core/forms.swig' %}
            {% include './partials/core/tables.swig' %}
            {% include './partials/core/code.swig' %}
        </div>

        <div class="elements">
            <div class="banner">
                <div class="container">
                    <h2 class="alpha banner-title">Elements</h2>
                </div>
            </div>
            {% include './partials/elements/icons.swig' %}
        </div>

        <div class="components">
            <div class="banner">
                <div class="container">
                    <h2 class="alpha banner-title">Components</h2>
                </div>
            </div>

        </div>
        {% endblock %}
    </div>
    <footer>
    {% block footer %} {% endblock %}
    </footer>
    <!-- JS FOOTER -->
    {% block footer_js %}
    <script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
    <script src="assets/js/application.js"></script>
    <!--  // <script src="//code.jquery.com/mobile/1.4.0/jquery.mobile-1.4.0.min.js"></script> -->
    {% endblock %}
</body>
</html>
