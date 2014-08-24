{% extends '../index.swig' %}

{% block styles %}
    <link rel="stylesheet" href="../../assets/css/style.css" media="all" />
{% endblock %}


{% block title %}
    {% block test_title %}{% endblock %}
{% endblock %}

{% block header %}
    {% block test_header %}{% endblock %}
{% endblock %}

{% block content %}
    {% block test_content %}{% endblock %}
{% endblock %}

{% block footer_js %}
<script src="http://code.jquery.com/jquery-1.11.1.min.js"></script>
<script src="../../assets/js/application.js"></script>
<!--  // <script src="//code.jquery.com/mobile/1.4.0/jquery.mobile-1.4.0.min.js"></script> -->
{% endblock %}
