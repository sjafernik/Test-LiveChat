# Test-LiveChat
Test task

The reported problem is a non-working widget on the client's site. The chat icon does not appear.

The first thing is to ask for basic things:
- doesn't it only work for him or for any user?
- if the website does not work for one user, you should take troubleshooting such as :
  - removing cookies, 
  - checking if the browser is up-to-date, 
  - disabling and re-enabling the browser, and even the computer if needed
  
 If the problem occurs regardless of the user, I would start with questions:
- Has this functionality worked before? If so, when did she stop?
- If it worked, did they change anything in the page code or elsewhere that might affect the page code?

If the client confirms that the functionality previously worked and suddenly stopped, but knows what has been changed, we can try to undo this change and check if it is its effect.

If the client confirms that the functionality previously worked and suddenly stopped, but they did not change anything (in my experience it is unlikely), I try to get information under what circumstances it stopped working, and then it will be necessary to check the website code because probably something was changed but the question is - what exactly?

Regardless of the scenario, I start by examining the page to see if there are any errors and if they can be related to the widget. No error occurred in the case type. Therefore, we should check whether the widget's linking with the client's website is correct.

If the client said that the widget never worked and they are trying to implement it, troubleshooting may be similar to the case described in the above line (no errors).
- Checking if there is a reference to the script calling the chat in the base file of the page (usually index.html).
- If there is no reference - add reference.
- If the reference is in the base file, check if other elements of the base page are not blocking the popup chat in some way.
- In the case of the presented page, I found a few hidden elements in index.html, including the "back" and "preview on" a frame (booking.com) buttons hidden with "display: none" (very tricky, I respect);
- After downloading the source code of the page and turning on index.html, I got the message "vls is not defined", so I checked the script code and basically changed the code there in two places:
    
    previou one:
    if(vls())
    {
    window._lc = window.__lc || {};
    window._lc.license = 14338644;
    
    current one:
    if(vls())
    {
    window.__lc = window.__lc || {};
    window.__lc.license = 14338644;
    
- However, I made more changes to the index.html file - changing:
    <script type = "text / javascript">
        function vls () {return $ (window) .width ()> 797? false: true}
    </script>
to:
    <script type = "text / javascript">
        function vls () {return true}
    </script>
    
- The change above allowed to define vls.
- I also created a test account at "https://app.getresponse.chat/" because I wasn't sure what it would look like in the end.
- I also commented on excerpts:
    <!--    <base href="https://helpers.livechatinc.com/blank/find_a_bug/" target="_blank">-->
    <!--<iframe id="customWebpage" src="" style="overflow:hidden;width: 100%;height:100%;margin-top:48px;position:absolute"></iframe>-->
    <!--<style>-->
    <!--		iframe{opacity: 0!important;}-->
    <!--	</style>-->
- Disabling them from the code took place gradually in order to check if any of them was blocking the widget, and I did not find any use for them on the presented page.
- My code seems to work fine, it is shown in this repository.
