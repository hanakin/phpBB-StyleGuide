{% extends '../../layouts/test.swig' %}

{% block test_title %}
Test - Colors
{% endblock %}

{% block test_header %}
<div class="banner">
    <div class="container">
        <h2 class="alpha banner-title">TEST: Forms</h2>
    </div>
</div>
{% endblock %}

{% block test_content %}
<div class="wrap">
{% include '../../partials/core/forms.swig' %}
</div>
{% endblock %}
