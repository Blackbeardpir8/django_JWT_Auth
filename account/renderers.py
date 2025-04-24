from rest_framework import renderers
import json


class UserRenderer(renderers.BaseRenderer):
    charset = 'utf-8'
    media_type = 'application/json'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        response = ''
        if 'ErrorDetail' in str(data):
            response = json.dumps({'error': data})
        else:
            response = json.dumps(data)

        return response