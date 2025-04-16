import sys
sys.path.append("/home/ser/Develop/Debug/")

import os
import shutil
import pandas as pd
import csv
import io
import json

rootFolder = "/Users/user/Desktop/Python"
os.chdir(rootFolder)

class serverfs:
    class create:
        def dir(dirname):
            dir = os.path.join(rootFolder, dirname)
            if not os.path.exists(dir):
                os.mkdir(dir)
        def file(dirname, filename):        
            with open(os.path.join(rootFolder, dirname, filename), 'w') as fp:
                fp.write('This is a new line')
    class rename:
        def dir(oldValue, newValue):
            oldpath = os.path.join(rootFolder, oldValue)
            newpath = os.path.join(rootFolder, newValue)
            if os.path.exists(oldpath) and not os.path.exists(newpath):
                os.rename(oldpath, newpath)
        def file(dirname, oldValue, newValue):
            oldpath = os.path.join(rootFolder, dirname, oldValue)
            newpath = os.path.join(rootFolder, dirname, newValue)
            if os.path.exists(oldpath) and not os.path.exists(newpath):
                os.rename(oldpath, newpath)
    class delete:
        def dir(dirname):
            dir = os.path.join(rootFolder, dirname)
            if os.path.exists(dir):
               os.rmdir(dir)
        def file(dirname, filename):
            file = os.path.join(rootFolder, dirname, filename) 
            os.remove(file)
    class copy:
        def dir(dirname1, dirname2):
            shutil.copytree(dirname1, dirname2)
        def file(dirname1, filename1, dirname2, filename2):
            if not os.path.exists(dirname2 + "/" + filename2):
                shutil.copyfile(dirname1 + "/" + filename1, dirname2 + "/" + filename2)
    class move:
        def dir(dirname1, dirname2):
            dir1 = os.path.join(rootFolder, dirname1) 
            dir2 = os.path.join(rootFolder, dirname2) 
            shutil.move(dir1, dir2)
        def file(filename, dirname1, dirname2):
            path1 = os.path.join(rootFolder, dirname1, filename) 
            path2 = os.path.join(rootFolder, dirname2, filename) 
            shutil.move(path1, path2)
    class load:
        def file(dirname, filename):
            ext = os.path.splitext(filename)[1]
            fp = open(os.path.join(rootFolder, dirname, filename), "r")
            data = {}
            if ext == ".csv":
                data = csv.DictReader(fp)
            elif ext == ".json":
                data = json.loads(fp.read())
            return data
            #fp.close()
    class safe_as:            
        def file_csv(dirname, filename, arr):
            json_string = json.dumps(arr)
            f = io.StringIO(json_string)
            df = pd.read_json(f)
            path = os.path.join(rootFolder, dirname, filename)
            df.to_csv(path, index=False)
        def file_json(dirname, filename, data):
            text = json.dumps(data)
            path = os.path.join(rootFolder, dirname, filename)
            fp = open(path, "w")
            fp.write(text)
            fp.close() 
  
 