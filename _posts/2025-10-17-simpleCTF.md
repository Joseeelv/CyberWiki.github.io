---
title: SimpleCTF
layout: post
post-image: "/assets/images/Rooms/THM/SimpleCTF/sctf.png"
description: CTF simulation for beginners where the user.txt and root.txt flags are obtained by scanning ports, searching for vulnerabilities, and exploiting them. Tools such as nmap and searchsploit are used to access an SSH server and escalate privileges, finally finding the flags.
difficulty: Easy
enlace: https://tryhackme.com/room/easyctf
os: Linux
skills:
  - Enumeration
  - Security
  - SQLi
---

> In this room, we'll obtain the flags `user.txt` and `root.txt` using various techniques explained below.
> This is a beginner-friendly CTF simulation where the goal is to find these flags.

# User.txt

---

This TryHackMe room features a Capture The Flag challenge for beginners.

Target machine IP → `10.10.42.145`

First, we'll perform a port scan to gather information.

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre class="language-bash" >sudo nmap -p- &lt;target_IP&gt;</pre>
  </div>
</div>

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf1.png" alt="sctf1" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We found several open ports. Let's gather more details about them.

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre class="language-bash" >nmap -sC -sV -p&lt;ports&gt;- --min-rate 3000 &lt;target_IP&gt;</pre>
  </div>
</div>

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf2.png" alt="sctf2" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We found port 80 (HTTP) hosting a web page, port 21 (FTP) for file transfers, and port 2222 running SSH.

Accessing the website:

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf3.png" alt="sctf3" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We reach the Ubuntu default page with nothing useful. Let's search for hidden directories.

<div style="text-align:center;">
 <div class="code-container">
    <div class="code-header">
      Bash
      <button class="copy-button" data-code="bash">Copy</button>
    </div>
    <pre class="language-bash" >gobuster dir -url &lt;target_IP&gt; -w &lt;wordlist&gt;</pre>
  </div>
</div>

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf4.png" alt="sctf4" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We found several directories including <b>/robots.txt</b> and <b>/simple</b>

## /robots.txt

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf5.png" alt="robots.txt" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

## /simple

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf6.png" alt="sctf6" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

This leads to another website. Let's look for useful information.

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf7.png" alt="sctf7" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We found a login page. Let's search for vulnerabilities.

We'll use the _searchsploit_ tool to find vulnerabilities.

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf8.png" alt="sctf8" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We navigate to the website containing the script and download it.

[The script only works with Python 3.](https://github.com/e-renna/CVE-2019-9053/blob/master/exploit.py){:target="\_blank"}

Using `python3 exploit.py -u <url> --crack -w <wordlist>`, we'll check if the exploit works and retrieve the password, where -u (website URL), —crack (indicates we're cracking a password), -w (wordlist parameter).

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf9.png" alt="sctf9" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We decrypt the key and can now connect to the SSH server.

Next, we establish an SSH connection with the obtained credentials:

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf10.png" alt="sctf10" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

We cat the user.txt file. And we found the flag.

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf11.png" alt="Flag" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Running `cd ..` reveals the directories _mitch_ (containing user.txt) and _sunbath_.

# Root.txt

---

Attempting to access the sunbath directory with `cd sunbath` returns a permission error.

To escalate privileges, we'll search for vulnerabilities → `sudo -l`

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf12.png" alt="sctf12" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

With this information, we can visit https://gtfobins.github.io/ to learn about the exploit.

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf13.png" alt="sctf13" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>

Now we run the exploit and execute `bash` to get a normal console, then search for the flag.

<div style="text-align: center;">
  <img src="/assets/images/Rooms/THM/SimpleCTF/sctf14.png" alt="sctf14" onclick="openModal(this.src)" style="width:100%; max-width:inherit;">
</div>
