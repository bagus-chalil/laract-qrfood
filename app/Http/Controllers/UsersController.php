<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\ModelHasRoles;
use App\Mail\MailReferalCodeUser;
use App\Helper\AutoGenerateReferal;
use App\Http\Requests\UsersRequest;
use Illuminate\Support\Facades\Mail;
use App\Helper\GenerateNumberController;
use App\Helper\HttpClientWA;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->auto_code_referal = new AutoGenerateReferal;
    }
    public function index(Request $request)
    {
        $dataUser = User::search($request->search)->paginate($request->filter ?? 10)->appends('query',null)->withQueryString();

        return Inertia::render('Admin/Users/User',[
            'dataUser' => $dataUser,
            'sessions' => session()->all()
        ]);
    }

    public function store(UsersRequest $request)
    {
        $data = array(
                    'name' => $request->name,
                    'email' => $request->email,
                    'no_telephone' => $request->no_telephone,
                    'password' => 'USERSFEST2024_ITFAMILY',
                    'referal_code' => $this->auto_code_referal->generateRandomReferal(),
                    'send_email' => 1,
                );

        $user = User::create($data);

        if ($request->with_role == 1) {
            $data_role = array(
                'role_id' => 2,
                'model_type' => 'App\Models\User',
                'model_id' => $user->id,
            );
            ModelHasRoles::create($data_role);
        }
        if ($request->with_email == 1) {
            //Broadcast Email
            Mail::to($data['email'])->send(new MailReferalCodeUser($user));
        }

        if ($request->with_wa == 1) {
            //Prepare Wa
            $apiWa = new HttpClientWA();

            $message = 'Halo Insan Kimia Farma! 🎉

Dalam rangka memeriahkan acara Festival Rakyat di acara HUT KF ke-54, kami mengundang kalian untuk menikmati berbagai hidangan lezat yang telah kami siapkan. Jangan lewatkan kesempatan ini untuk mencicipi hidangan spesial yang hanya tersedia untuk Anda!

📱 Cara Pesan :
Silakan masuk ke aplikasi pemesanan melalui link di bawah ini dan pilih menu favorit Anda. Setiap orang dapat memesan:

    1 Menu Makanan Berat
    2 Menu Jajanan
    1 Menu Minuman

Cepat pesan sekarang dan nikmati hidangan spesial di Festival Rakyat! 🎊

Pesan Menu Makanan di Sini:

https://fest-kf-54.kimiafarma.app/order/'.$user->referal_code.'

            ';

            //Broadcast Email
            $apiWa->sendMessage($user->no_telephone,$message);
        }

        return redirect(url('users'))->with('message', 'Data Berhasil ditambahkan !');
    }

    public function update(Request $request, $id)
    {
        User::find($id)->update([
            'name' => $request->name,
            'email' => $request->email,
            'no_telephone' => $request->no_telephone,
        ]);

        return redirect(url('category'))->with('message', 'Data Berhasil diperbarui !');
    }

    public function guestRegistration()
    {
        return Inertia::render('Admin/Users/GuestRegister',[
            'sessions' => session()->all()
        ]);
    }
}
