for d in */ ; do
    echo "$d"
    cd $d
    git checkout master
    git pull -r
    git fetch && for branch in `git branch -vv | grep ': gone]' | awk '{print $1}'`; do 
        git branch -D $branch; 
    done
    cd ../
    echo " "
done
