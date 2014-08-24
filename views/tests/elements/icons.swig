{% extends '../../layouts/test.swig' %}

{% block test_title %}
Test - Colors
{% endblock %}

{% block test_header %}
<div class="banner">
    <div class="container">
        <h2 class="alpha banner-title">TEST: Icons</h2>
    </div>
</div>
{% endblock %}

{% block test_content %}
<div class="wrap">
{% include '../../partials/elements/icons.swig' %}
</div>
{% endblock %}
