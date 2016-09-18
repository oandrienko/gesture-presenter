import os

# Make filepaths relative to settings.
path = lambda root,*a: os.path.join(root, *a)
ROOT = os.path.dirname(os.path.abspath(__file__))

DIRNAME = os.path.dirname(__file__)

settings = {
    "template_path": os.path.join(DIRNAME, 'template'),
    "static_path": os.path.join(DIRNAME, 'static'),
    "debug": True
}