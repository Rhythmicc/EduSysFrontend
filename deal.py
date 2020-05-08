import pyperclip
import os

file_name = pyperclip.paste()
ss = \
"""\
{
    path: '/%s',
    name: '%s',
    component: require('@/ManagerAction/%s').default
},
""" % (file_name, file_name, file_name)
pyperclip.copy(ss)

