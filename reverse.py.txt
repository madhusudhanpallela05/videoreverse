from flask import Flask, render_template, request, send_file
import os
import cv2
import numpy as np
import moviepy.editor as mp

app = Flask(__name__)
UPLOAD_FOLDER = 'static/uploads'
PROCESSED_FOLDER = 'static/processed'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)


def reverse_video(input_path, output_path):
    clip = mp.VideoFileClip(input_path)
    reversed_clip = clip.fx(mp.vfx.time_mirror)
    reversed_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload():
    if 'video' not in request.files:
        return 'No file uploaded', 400
    
    file = request.files['video']
    if file.filename == '':
        return 'No selected file', 400
    
    input_path = os.path.join(UPLOAD_FOLDER, file.filename)
    output_path = os.path.join(PROCESSED_FOLDER, 'reversed_' + file.filename)
    file.save(input_path)
    
    reverse_video(input_path, output_path)
    
    return send_file(output_path, as_attachment=False)


if __name__ == '__main__':
    app.run(debug=True)
